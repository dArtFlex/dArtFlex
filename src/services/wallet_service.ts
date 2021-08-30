//@ts-nocheck
import BigNumber from 'bignumber.js'
import { Web3Service } from 'services/web3_service'
import { listingService } from 'services/listing_service'
import { STANDART_TOKEN_ABI } from 'core/contracts/standard_token_contract'
import { AUCTION_CONTRACT_ADDRESS } from 'core/contracts/auction_contract'
import appConst from 'config/consts'

const signTypes = {
  Sign: [],
}
class WalletService extends Web3Service {
  async getMetaMaskAccount() {
    this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    this.balance = await new Promise((resolve) => {
      this.web3.eth.getBalance(this.accounts[0], (err, balance) => {
        resolve(BigNumber(balance).dividedBy(10e17).toNumber())
      })
    })
    this.chainId = await ethereum.request({ method: 'eth_chainId' })
    return this
  }

  async getWalletConnectAccount() {
    const wallet = localStorage.getItem(appConst.WALLET_CONNECT)

    if (wallet) {
      this.accounts = JSON.parse(wallet as string).accounts
    } else {
      const web3 = await this.setWeb3WalletConnectProvider()
      this.accounts = await this.web3.eth.getAccounts()
      this.web3 = web3
    }

    const balance = await this.web3.eth.getBalance(this.accounts[0])
    this.balance = BigNumber(balance).dividedBy(10e17).toNumber()
    this.chainId = await this.web3.eth.getChainId()
    return this
  }

  getChainId() {
    return this.chainId
  }

  getAccoutns() {
    return this.accounts
  }

  getTokenContract(tokenId) {
    return new web3.eth.Contract(STANDART_TOKEN_ABI, tokenId)
  }

  async generateSignature() {
    const data = listingService.createTypeData(
      {
        name: 'sign',
        version: '1',
        chainId: Number(this.chainId),
        verifyingContract: AUCTION_CONTRACT_ADDRESS,
      },
      'Sign',
      {},
      signTypes
    )

    const signature = await listingService.signTypedData(data)
    return {
      data: JSON.stringify(data),
      signature,
    }
  }
}

export const walletService = new WalletService()
