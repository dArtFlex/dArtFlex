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
} from '../reducers/wallet'
import { IChainId, ITokenBalances, IBaseTokens } from 'types'
import { storageActiveWallet, createWalletInstance } from 'utils'
import tokensAll from 'core/tokens'
import appConst from 'config/consts'
import APP_CONFIG from 'config'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* connectMetaMask(api: IApi) {
  try {
    const { accounts, balance, chainId } = yield walletService.getMetaMaskAccount()

    if (chainId && chainId !== '0x1' && chainId !== '0x4') {
      return yield put(connectMetaMaskFailure('Not supported network'))
    }

    const walletInstance = createWalletInstance(accounts, balance, 'ETH')

    storageActiveWallet(walletInstance, appConst.WALLET_CONNECT_STORAGE.METAMASK)
    yield put(connectMetaMaskSuccess(walletInstance))

    const chainChannel = yield call(chainChangedChannel)
    while (true) {
      const data = yield take(chainChannel)
      yield put(connectMetaMaskFailure(data ? '' : 'Not supported network'))
    }
  } catch (e) {
    const error = e?.message || e
    yield put(connectMetaMaskFailure(error))
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* connectWalletConnect(api: IApi) {
  try {
    const { accounts, balance, chainId } = yield walletService.getWalletConnectAccount()

    if (chainId && chainId !== '0x1' && chainId !== '0x4') {
      return yield put(connectTrustFailure('Not supported network'))
    }

    const walletInstance = createWalletInstance(accounts, balance, 'ETH')

    storageActiveWallet(walletInstance, appConst.WALLET_CONNECT_STORAGE.TRUST)
    yield put(connnectWalletConnectSuccess(walletInstance))

    const chainChannel = yield call(chainChangedChannel)
    while (true) {
      const data = yield take(chainChannel)
      yield put(connnectWalletConnectFailure(data ? '' : 'Not supported network'))
    }
  } catch (e) {
    const error = e?.message || e
    yield put(connnectWalletConnectFailure(error))
  }
}

function chainChangedChannel() {
  return eventChannel((emit) => {
    ethereum.on('chainChanged', (chainId) => {
      if (chainId !== '0x1' && chainId !== '0x4') {
        emit(false)
      } else {
        emit(true)
      }
    })

    // We don't need do anything in unsubscribe as we always wanna know if user change network
    const unsubscribe = () => {
      ethereum.on('chainChanged', null)
    }

    return unsubscribe
  })
}

export function* getTokensBalances(api: IApi, { payload }: PayloadAction<{ wallet: string }>) {
  try {
    const chainId: IChainId = walletService.getChainId()
    const tokens: Array<IBaseTokens> = tokensAll[chainId].filter((t) => t.id.length > 2 && t.id.startsWith('0x'))

    const balances: Array<ITokenBalances | undefined> = yield all(
      tokens.map((t) => call(getBalance, api, t, payload.wallet))
    )

    const tokensBalances = balances.filter((b) => b && b.balance !== '0')
    yield put(getTokensBalancesSuccess(tokensBalances as ITokenBalances[] | []))
  } catch (e) {
    yield put(getTokensBalancesFailure(e.message || e))
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
    if (ethereum.isConnected()) {
      ethereum.on('disconnect', (error) => console.log(error))
      localStorage.removeItem(appConst.WALLET_CONNECT_STORAGE.METAMASK)
    }
    if (window.connector) {
      connector.on('disconnect', (error) => console.log(error))
      localStorage.removeItem(appConst.WALLET_CONNECT)
    }
    localStorage.removeItem(appConst.ACTIVE_WALLET_STORAGE)

    yield put(walletsDisconeSuccess())
    window.location.reload()
  } catch (e) {
    yield put(walletsDisconeFailure())
  }
}
