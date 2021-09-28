//@ts-nocheck
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import APP_CONFIG from 'config'

declare global {
  interface Window {
    web3: Web3
  }
}
export class Web3Service {
  public web3!: Web3

  constructor() {
    const web3Provider = window?.ethereum || Web3.givenProvider || APP_CONFIG.rinkebyProvider
    this.web3 = new Web3(web3Provider)
    window.web3 = this.web3
  }

  getNetworkType(): Promise<string> {
    return this.web3?.eth.net.getNetworkType()
  }

  isWeb3Connected(): boolean {
    return Boolean(this.web3)
  }

  async connectMetaMaskWallet(): Promise<string[]> {
    const provider = await detectEthereumProvider()

    return new Promise<string[]>((resolve, reject) => {
      if (!provider) {
        this.message.create('error', 'Please install Metamask to proceed')
        throw Error('Metamask not found')
      }
      window?.ethereum
        .send('eth_requestAccounts')
        .then((res) => {
          const account = res.result[0]
          if (account) {
            // Todo: do smth with localStorage
          }
          resolve(res.result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async setWeb3WalletConnectProvider() {
    const provider = new WalletConnectProvider({
      infuraId: APP_CONFIG.rinkebyProviderAddress,
    })
    await provider.enable()
    const web3 = new Web3(provider)
    this.web3 = web3
    window.connector = provider
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
