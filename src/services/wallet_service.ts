//@ts-nocheck
import BigNumber from 'bignumber.js'
import { web3Service } from 'services/web3_service'

class WalletService {
  async getMetaMaskAccount() {
    const web3 = await web3Service.setWeb3EthProvider()
    this.accounts = await web3.currentProvider.request({ method: 'eth_requestAccounts' })
    this.balance = await new Promise((resolve) => {
      web3.eth.getBalance(this.accounts[0], (err, balance) => {
        resolve(BigNumber(balance).dividedBy(10e17).toNumber())
      })
    })
    this.chainId = await ethereum.request({ method: 'eth_chainId' })
    return this
  }

  getChainId(): any {
    return this.chainId
  }

  getAccoutns() {
    return this.accounts
  }
}

export const walletService = new WalletService()
