//@ts-nocheck
import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import { put } from 'redux-saga/effects'
import { IApi } from '../../services/types'

export function* getAssetsData(api: IApi) {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Main,
    })
    console.log('provider', provider)
    console.log('seaport', seaport)
    try {
      yield window.ethereum.enable()
      const account = yield window.web3.eth.getAccounts()
      const balance = yield window.web3.eth.getBalance(account[0])
      //@todo add to store
      alert(` your account is ${account} \n your balance is ${balance}`)
    } catch (e) {
      // User has denied account access to DApp...
    }
  } else {
    alert(`add MetaMask ext`)
  }
}
