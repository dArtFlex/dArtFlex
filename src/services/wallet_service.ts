//@ts-nocheck
import Web3 from 'web3'
import Web3Service from 'services/web3_service'
import BigNumber from 'bignumber.js'

export default class WalletService extends Web3Service {
  setWeb3Provider(provider): void {
    window.web3 = new Web3(provider)
    this.web3 = window.web3
    this.provider = provider
  }

  getWeb3Provider(): unknown {
    return this.provider
  }

  getMetaMaskAccount(): Promise<any> {
    return this.provider.request({ method: 'eth_requestAccounts' })
  }

  getEthBalance(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getCoinbase((err, account) => {
        this.web3.eth.getBalance(account, (err, balance) => {
          resolve(BigNumber(balance).dividedBy(10e17).toNumber())
        })
      })
    })
  }
}
