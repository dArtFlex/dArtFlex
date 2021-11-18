import Web3 from 'web3'
import { getChainKeyByChainId } from 'utils'
import APP_CONFIG from 'config'

declare global {
  interface Window {
    web3: Web3
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    connector: any
  }
}
export class Web3Service {
  public web3!: Web3
  chainId!: number

  constructor() {
    const web3Provider = window?.ethereum || Web3.givenProvider
    this.web3 = new Web3(web3Provider)
    window.web3 = this.web3
    if (!this.chainId) {
      Web3Service.initializeChainId(this.web3)
    }
  }

  static async initializeChainId(web3: Web3) {
    if (!web3.currentProvider) {
      Web3Service.prototype.chainId = 1 // Default chain Id
      Web3Service.prototype.web3 = new Web3(APP_CONFIG.__eth) // Default chain
      return
    }
    const chainId: number = await web3.eth.getChainId()
    const chainName = getChainKeyByChainId(chainId)
    Web3Service.prototype.chainId = chainId
    if (chainName) {
      Web3Service.prototype.web3 = new Web3(APP_CONFIG[chainName])
    }
  }

  setWeb3(web3: Web3) {
    this.web3 = web3
  }

  getWeb3() {
    return this.web3
  }

  getProvider() {
    return this.web3.currentProvider
  }
}

export const web3Service = new Web3Service()
