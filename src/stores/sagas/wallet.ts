//@ts-nocheck
import { put } from 'redux-saga/effects'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletService from 'services/wallet_service'
import { connectMetaMaskSuccess, connectMetaMaskFailure } from '../reducers/wallet'
import { storageActiveWallet, createWalletInstance } from 'utils'
import APP_CONFIG from 'config'

export function* connectMetaMask(api: IApi) {
  try {
    const wallet = new WalletService()

    const provider = yield detectEthereumProvider()
    wallet.setWeb3Provider(provider)

    const accounts = yield wallet.getMetaMaskAccount()
    const balance = yield wallet.getEthBalance(accounts)

    const walletInstance = createWalletInstance(accounts, balance, 'ETH')

    storageActiveWallet(walletInstance, APP_CONFIG.walletConnectMetaMaskStorage)
    yield put(connectMetaMaskSuccess(walletInstance))
  } catch (e) {
    yield put(connectMetaMaskFailure(e))
  }
}
