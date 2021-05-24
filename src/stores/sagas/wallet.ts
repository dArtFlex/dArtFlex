//@ts-nocheck
import { eventChannel } from 'redux-saga'
import { put, call, take } from 'redux-saga/effects'
import { walletService } from 'services/wallet_service'
import {
  connectMetaMaskSuccess,
  connectMetaMaskFailure,
  connectTrustSuccess,
  connectTrustFailure,
} from '../reducers/wallet'
import { storageActiveWallet, createWalletInstance } from 'utils'
import APP_CONFIG from 'config'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* connectMetaMask(api: IApi) {
  try {
    const { accounts, balance } = yield walletService.getMetaMaskAccount()

    // if (chainId !== '0x1' && chainId !== '0x4') {
    //   return yield put(connectMetaMaskFailure('Not supported network'))
    // }

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* connectTrust(api: IApi) {
  try {
    const { accounts, balance, chainId } = yield walletService.getTrustAccount()

    if (chainId !== '0x1' && chainId !== '0x4') {
      return yield put(connectTrustFailure('Not supported network'))
    }

    const walletInstance = createWalletInstance(accounts, balance, 'ETH')

    storageActiveWallet(walletInstance, APP_CONFIG.walletConnectTrustStorage)
    yield put(connectTrustSuccess(walletInstance))

    const chainChannel = yield call(chainChangedChannel)
    while (true) {
      const data = yield take(chainChannel)
      yield put(connectTrustFailure(data ? '' : 'Not supported network'))
    }
  } catch (e) {
    const error = e?.message || e
    yield put(connectTrustFailure(error))
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
