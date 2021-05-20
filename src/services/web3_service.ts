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
      const web3Provider = window.web3.currentProvider
      window.web3 = new Web3(web3Provider)
      this.web3 = window.web3
    }
  }

  getNetworkType(): Promise<string> {
    return this.web3?.eth.net.getNetworkType()
  }

  isWeb3Connected(): boolean {
    return Boolean(this.web3)
  }

  connectMetaMaskWallet(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      if (!window.ethereum) {
        this.message.create('error', 'Please install Metamask to proceed')
        throw Error('Metamask not found')
      }
      window.ethereum
        .send('eth_requestAccounts')
        .then((res: any) => {
          const account = res.result[0]
          if (account) {
            // Todo: do smth with localStorage
          }
          resolve(res.result)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  setWeb3OpenSeaProvider() {
    const provider = new Web3.providers.HttpProvider(appConfig.rinkebyProvider)
    const web3 = new Web3(provider)
    this.web3 = web3
    return web3
  }

  async setWeb3EthProvider() {
    const provider = await detectEthereumProvider()
    const web3 = new Web3(Web3.givenProvider)
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
