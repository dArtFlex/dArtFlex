//@ts-nocheck
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import appConfig from 'config'

declare global {
  interface Window {
    web3: Web3
  }
}
class Web3Service {
  private web3!: Web3

  constructor() {
    if (window.web3?.currentProvider) {
      this.web3 = window.web3
      this.provider = window.web3.currentProvider
    } else {
      window.web3 = new Web3(window.ethereum || Web3.givenProvider || appConfig.ethereumProvider)
    }
  }

  setWeb3OpenSeaProvider() {
    const provider = new Web3.providers.HttpProvider(appConfig.rinkebyProvider)
    const web3 = new Web3(provider)
    this.web3 = web3
    return web3
  }

  async setWeb3EthProvider() {
    const provider = await detectEthereumProvider()
    const web3 = new Web3(provider)
    this.web3 = web3
    return web3
  }

  async setWeb3TrustProvider() {
    const provider = new WalletConnectProvider({
      rpc: {
        1: appConfig.baseURL,
        2: appConfig.localURL,
      },
    })
    await provider.enable()
    const web3 = new Web3(provider)
    this.web3 = web3
    return web3
  }

  getWeb3() {
    return this.web3
  }

  getProvider() {
    return this.web3.currentProvider
  }
}

export const web3Service = new Web3Service()
