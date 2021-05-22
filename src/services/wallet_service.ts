//@ts-nocheck
import BigNumber from 'bignumber.js'
import { web3Service } from 'services/web3_service'

class WalletService {
  async getMetaMaskAccount() {
    const web3 = await web3Service.setWeb3EthProvider()
    this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    this.balance = await new Promise((resolve) => {
      web3.eth.getBalance(this.accounts[0], (err, balance) => {
        resolve(BigNumber(balance).dividedBy(10e17).toNumber())
      })
    })
    this.chainId = await ethereum.request({ method: 'eth_chainId' })
    return this
  }

  async getTrustAccount() {
    const web3 = await web3Service.setWeb3TrustProvider()
    this.accounts = await window.ethereum.accounts
    this.balance = await new Promise((resolve) => {
      web3.eth.getBalance(this.accounts[0], (err, balance = 0) => {
        resolve(BigNumber(balance).dividedBy(10e17).toNumber())
      })
    })
    this.chainId = '0x1'
    return this
  }

  getChainId() {
    return this.chainId
  }

  getAccoutns() {
    return this.accounts
  }
}

export const walletService = new WalletService()
