//@ts-nocheck
import BigNumber from 'bignumber.js'

class WalletService {
  constructor() {
    if (window.web3?.currentProvider) {
      this.web3 = window.web3
      this.provider = window.web3.currentProvider
    }
  }

  getMetaMaskAccount(): Promise<any> {
    return this.provider.request({ method: 'eth_requestAccounts' })
  }

  getEthBalance(): Promise<any> {
    return new Promise((resolve) => {
      this.web3.eth.getCoinbase((err, account) => {
        this.web3.eth.getBalance(account, (err, balance) => {
          resolve(BigNumber(balance).dividedBy(10e17).toNumber())
        })
      })
    })
  }
}

export const walletService = new WalletService()
