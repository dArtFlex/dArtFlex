//@ts-nocheck
import Contract from 'web3-eth-contract'
import { ABI, NFT_CONTRACT_ADDRESS } from 'core'
import { OpenSeaPort, Network } from 'opensea-js'
import { walletService } from 'services/wallet_service'

class Blockchain {
  newContract() {
    Contract.setProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
    const contract = new Contract(ABI, NFT_CONTRACT_ADDRESS)
    this.contract = contract
  }

  async getTokenId(i: number) {
    return await this.contract.methods.tokenByIndex(i).call()
  }

  // async mintNFT(tokenUri: string) {
  //   const { accounts } = await walletService.getMetaMaskAccount()
  //   return await this.contract.methods.mint(accounts[0], tokenUri, accounts[0]).call()
  // }

  setSeaport(provider) {
    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Rinkeby,
    })
    this.seaport = seaport
    return seaport
  }

  getSeaport() {
    return this.setSeaport
  }
}

export const bc = new Blockchain()
