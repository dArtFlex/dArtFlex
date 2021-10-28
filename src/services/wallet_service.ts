import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { web3Service, Web3Service } from 'services/web3_service'
import { listingService } from 'services/listing_service'
import { abiStandardToken } from 'core/contracts/abi'
import { contractAddress } from 'core/contracts/addresses'
import appConst from 'config/consts'
import { IChainName } from 'types'
import { getChainKeyByChainId } from 'utils'
import APP_CONFIG from 'config'

const signTypes = {
  Sign: [],
}
export class WalletService extends Web3Service {
  keyChain!: IChainName
  accounts!: string[]
  balance!: number

  async getMetaMaskAccount() {
    if (window.ethereum === undefined) {
      return
    }

    const chainName: IChainName | undefined = await this.getChainName()
    if (!chainName) {
      console.log(`Error in @getMetaMaskAccount: Unsupported chain name ${chainName}`)
      return
    }

    if (chainName) {
      this.web3 = new Web3(APP_CONFIG[chainName])
      this.keyChain = chainName
      web3Service.setWeb3(this.web3)
    }

    this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const balance = await this.web3.eth.getBalance(this.accounts[0])
    this.balance = new BigNumber(balance).dividedBy(10e17).toNumber()
    return this
  }

  async getWalletConnectAccount() {
    const wallet = localStorage.getItem(appConst.WALLET_CONNECT)

    const chainName: IChainName | undefined = await this.getChainName()
    if (!chainName) {
      console.log(`Error in @getMetaMaskAccount: Unsupported chain name ${chainName}`)
      return
    }

    if (wallet) {
      this.accounts = JSON.parse(wallet as string).accounts
    } else {
      if (chainName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider: any = new WalletConnectProvider({
          rpc: APP_CONFIG[this.keyChain],
        })
        await provider.enable()
        this.web3 = new Web3(provider)
        this.keyChain = chainName
        web3Service.setWeb3(this.web3)
        window.connector = provider

        this.accounts = await this.web3.eth.getAccounts()
      }
    }

    const balance = await this.web3.eth.getBalance(this.accounts[0])
    this.balance = new BigNumber(balance).dividedBy(10e17).toNumber()
    return this
  }

  async getChainName(): Promise<IChainName | undefined> {
    this.chainId = await this.web3.eth.getChainId()
    return getChainKeyByChainId(this.chainId)
  }

  getChainId(): number {
    return this.chainId
  }

  getAccoutns() {
    return this.accounts
  }

  getTokenContract(tokenId: string) {
    return new this.web3.eth.Contract(abiStandardToken, tokenId)
  }

  getChainKeyName(): IChainName {
    return this.keyChain
  }

  async generateSignature() {
    const chainName = this.getChainKeyName()
    const data = listingService.createTypeData(
      {
        name: 'sign',
        version: '1',
        chainId: Number(this.chainId),
        verifyingContract: chainName && contractAddress[chainName].exchangeV2,
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
