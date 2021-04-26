//@ts-nocheck
import Web3 from 'web3'

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
      this.provider = web3Provider
    }
  }

  setWeb3Provider(provider: any): void {
    window.web3 = new Web3(provider)
    this.web3 = window.web3
    this.provider = provider
  }

  getWeb3Provider(): any {
    return this.provider
  }
}

export const web3Service = new Web3Service()
