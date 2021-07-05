//@ts-nocheck
import Contract from 'web3-eth-contract'
import { ABI } from 'core/contracts/dartflex_contract'
import { OpenSeaPort, Network } from 'opensea-js'

class Blockchain {
  constructor() {
    Contract.setProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
    this.contract = new Contract(ABI, '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82')
    // Previous contract with assets
    // this.contract = new Contract(ABI, NFT_CONTRACT_ADDRESS)
  }

  getContract() {
    return this.contract
  }

  async getTokenId(i: number) {
    return await this.contract.methods.tokenByIndex(i).call()
  }

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

export const contract = new Blockchain()
