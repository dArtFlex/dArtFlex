//@ts-nocheck
import { eventChannel, END } from 'redux-saga'
import { put, call, take } from 'redux-saga/effects'
import detectEthereumProvider from '@metamask/detect-provider'
import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { connectMetaMaskSuccess, connectMetaMaskFailure } from '../reducers/wallet'
import { storageActiveWallet, createWalletInstance } from 'utils'
import APP_CONFIG from 'config'

export function* connectMetaMask(api: IApi) {
  try {
    const provider = yield detectEthereumProvider()
    web3Service.setWeb3Provider(provider)

    const chainId = yield walletService.getChainId()
    if (chainId !== '0x1' && chainId !== '0x4') {
      return yield put(connectMetaMaskFailure('Not supported network'))
    }

    const accounts = yield walletService.getMetaMaskAccount()
    const balance = yield walletService.getEthBalance(accounts)

    const walletInstance = createWalletInstance(accounts, balance, 'ETH')

    storageActiveWallet(walletInstance, APP_CONFIG.walletConnectMetaMaskStorage)
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

function chainChangedChannel() {
  return eventChannel((emit) => {
    ethereum.on('chainChanged', (chainId: any) => {
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
