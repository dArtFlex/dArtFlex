//@ts-nocheck
import { put } from 'redux-saga/effects'
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

    const accounts = yield walletService.getMetaMaskAccount()
    const balance = yield walletService.getEthBalance(accounts)

    const walletInstance = createWalletInstance(accounts, balance, 'ETH')

    storageActiveWallet(walletInstance, APP_CONFIG.walletConnectMetaMaskStorage)
    yield put(connectMetaMaskSuccess(walletInstance))
  } catch (e) {
    yield put(connectMetaMaskFailure(e))
  }
}
