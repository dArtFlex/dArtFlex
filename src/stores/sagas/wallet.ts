//@ts-nocheck
import { eventChannel } from 'redux-saga'
import { put, call, take, all } from 'redux-saga/effects'
import { walletService } from 'services/wallet_service'
import BigNumber from 'bignumber.js'
import {
  connectMetaMaskSuccess,
  connectMetaMaskFailure,
  connnectWalletConnectSuccess,
  connnectWalletConnectFailure,
  getTokensBalancesSuccess,
  getTokensBalancesFailure,
  walletsDisconeSuccess,
  walletsDisconeFailure,
  walletsDisconetRequest,
} from '../reducers/wallet'
import { initialConnection } from 'stores/sagas/user'
import { IChainId, ITokenBalances, IBaseTokens } from 'types'
import { storageActiveWallet, createWalletInstance, getWalletsFromHistory } from 'utils'
import tokensAll from 'core/tokens'
import APP_CONSTS from 'config/consts'
import APP_CONFIG from 'config'
import { history } from '../../navigation'
import routes from '../../routes'
import { parseJS, notSupportedNetwork, networkConvertor, getTokenInfoByChainId } from 'utils'

function checkBlackList(account: string) {
  return APP_CONSTS.USER.BLACK_LIST.some(
    (blackAccount) => blackAccount.toLocaleLowerCase() === account.toLocaleLowerCase()
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* connectMetaMask(api: IApi) {
  try {
    const { accounts, balance, chainId } = yield walletService.getMetaMaskAccount()

    if (checkBlackList(accounts[0])) {
      const error = {
        code: 4001,
        message: 'You wallet accounts was blocked',
      }
      return yield put(connectMetaMaskFailure(error))
    }

    if (notSupportedNetwork(chainId)) {
      return yield put(connectMetaMaskFailure('Not supported network'))
    }
    const tokenName = getTokenInfoByChainId(chainId)?.symbol || 'none'
    const walletInstance = createWalletInstance(accounts, balance, tokenName)

    storageActiveWallet(walletInstance, APP_CONSTS.WALLET_CONNECT_STORAGE.METAMASK)
    yield put(connectMetaMaskSuccess(walletInstance))
    yield call(initialConnection, api, { payload: { accounts: accounts[0] } })

    const isAccepted = parseJS(localStorage.getItem(APP_CONSTS.ACCEPT_COMMUNITY_GUIDELINES))
    if (!isAccepted) {
      history.push(routes.wellcome)
    }

    const chainChannel = yield call(chainChangedChannel)
    while (true) {
      const data = yield take(chainChannel)
      if (data.chainId) {
        yield put(connectMetaMaskFailure(data ? '' : 'Not supported network'))
      }
      if (data.accounts) {
        window.location.reload()
      }
    }
  } catch (e) {
    const error = e?.message || e
    yield put(connectMetaMaskFailure(error))
  }
}

function chainChangedChannel() {
  return eventChannel((emit) => {
    ethereum.on('chainChanged', (chainId) => {
      if (notSupportedNetwork(chainId)) {
        emit(false)
      } else {
        emit(true)
      }
    })

    ethereum.on('accountsChanged', function (accounts) {
      emit({ accounts })
    })

    // We don't need do anything in unsubscribe as we always wanna know if user change network
    const unsubscribe = () => {
      ethereum.on('chainChanged', null)
    }

    return unsubscribe
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* connectWalletConnect(api: IApi) {
  try {
    const { accounts, balance, chainId } = yield walletService.getWalletConnectAccount()

    if (checkBlackList(accounts[0])) {
      yield connector.close()
      const error = {
        code: 4001,
        message: 'You wallet accounts was blocked',
      }
      return yield put(connnectWalletConnectFailure(error))
    }

    if (notSupportedNetwork(chainId)) {
      return yield put(connectTrustFailure('Not supported network'))
    }

    const tokenName = getTokenInfoByChainId(chainId)?.symbol || 'none'
    const walletInstance = createWalletInstance(accounts, Number(balance), tokenName)

    storageActiveWallet(walletInstance, APP_CONSTS.WALLET_CONNECT)
    yield put(connnectWalletConnectSuccess(walletInstance))
    yield call(initialConnection, api, { payload: { accounts: accounts[0] } })

    const isAccepted = parseJS(localStorage.getItem(APP_CONSTS.ACCEPT_COMMUNITY_GUIDELINES))
    if (!isAccepted) {
      history.push(routes.wellcome)
    }

    const chainChannel = yield call(chainListenerWalletConnect)
    while (true) {
      const data = yield take(chainChannel)
      if (data.disconnect) {
        return yield put(walletsDisconetRequest())
      }
      yield put(connnectWalletConnectFailure(data ? '' : 'Not supported network'))
    }
  } catch (e) {
    const error = e?.message || e
    yield put(connnectWalletConnectFailure(error))
  }
}

function chainListenerWalletConnect() {
  return eventChannel((emit) => {
    connector.on('disconnect', () => {
      emit({ disconnect: true })
    })

    connector.on('session_update', (_, payload) => {
      const { chainId } = payload.params[0]

      if (notSupportedNetwork(chainId)) {
        emit(false)
      } else {
        emit(true)
      }
    })

    connector.on('session_update', function (_, payload) {
      const { accounts } = payload.params[0]
      emit({ accounts })
    })

    // We don't need do anything in unsubscribe as we always wanna know if user change network
    const unsubscribe = () => {
      connector.on('chainChanged', null)
    }

    return unsubscribe
  })
}

export function* getTokensBalances(api: IApi, { payload }: PayloadAction<{ wallet: string }>) {
  try {
    const getChainId: IChainId = walletService.getChainId()
    const chainId: IChainId = networkConvertor(getChainId)
    const tokens: Array<IBaseTokens> = tokensAll[chainId].filter((t) => t.id.length > 2 && t.id.startsWith('0x'))

    const balances: Array<ITokenBalances | undefined> = yield all(
      tokens.map((t) => call(getBalance, api, t, payload.wallet))
    )

    const tokensBalances = balances.filter((b) => b && b.balance !== '0')
    yield put(getTokensBalancesSuccess(tokensBalances as ITokenBalances[] | []))
  } catch (e) {
    yield put(getTokensBalancesFailure(e))
  }
}

function* getBalance(api: IApi, token: IBaseTokens, acc: string) {
  try {
    const { id, decimals, symbol } = token

    if (acc && id) {
      const tokenContract = walletService.getTokenContract(id)
      const balance: string = yield tokenContract.methods.balanceOf(acc).call()
      if (balance !== '0') {
        const _balance = new BigNumber(balance)
          .div(`10e${decimals - 1}`)
          .toNumber()
          .toFixed(2)

        const price: { [key: string]: number } = yield call(api, {
          url: APP_CONFIG.exchangeRate(symbol, 'USD'),
          method: 'GET',
        })
        const _price = price?.USD
        return {
          id,
          symbol,
          balance: _balance,
          priceUSD: _price,
          balanceUSD: new BigNumber(_balance).times(_price).toNumber(),
        }
      }
    }
  } catch (e) {
    throw new Error(e.message || `getBalance: ${e}`)
  }
}

export function* walletsDisconet() {
  try {
    if (typeof connector !== 'undefined' && connector.connected) {
      // In reason to disconnect wallet connect we have to close wallet connect socket
      yield connector.close()
      localStorage.removeItem(APP_CONSTS.WALLET_CONNECT)
    }
    if (ethereum.isConnected()) {
      ethereum.on('disconnect', (error) => console.log(error))
      localStorage.removeItem(APP_CONSTS.WALLET_CONNECT_STORAGE.METAMASK)
    }

    localStorage.removeItem(APP_CONSTS.ACTIVE_WALLET_STORAGE)

    yield put(walletsDisconeSuccess())
    window.location.reload()
  } catch (e) {
    yield put(walletsDisconeFailure())
  }
}

export function* walletsHistory() {
  try {
    const history = getWalletsFromHistory()

    if (history.activeWallet === APP_CONSTS.WALLET_CONNECT_STORAGE.METAMASK) {
      const accounts: string[] | undefined = yield web3.eth.getAccounts()
      if (accounts?.length && accounts[0].toLowerCase() === history.connectedMetaMask.accounts[0].toLowerCase()) {
        yield call(connectMetaMask)
      }
    } else if (history.activeWallet === APP_CONSTS.WALLET_CONNECT) {
      yield call(connectWalletConnect)
    }
  } catch (e) {
    throw new Error(e)
  }
}
