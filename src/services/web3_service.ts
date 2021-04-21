//@ts-nocheck
import Web3 from 'web3'

declare global {
  interface Window {
    web3: Web3
  }
}

export default class Web3Service {
  private web3!: Web3

  constructor() {
    if (window.web3?.currentProvider) {
      const web3Provider = window.web3.currentProvider
      window.web3 = new Web3(web3Provider)
      this.web3 = window.web3
    }
  }
}
