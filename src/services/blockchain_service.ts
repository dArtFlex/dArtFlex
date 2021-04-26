//@ts-nocheck
import Contract from 'web3-eth-contract'
import { ABI, TOKEN_ADDRESS } from 'core'

class Blockchain {
  newContract(): any {
    Contract.setProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
    const contract = new Contract(ABI, TOKEN_ADDRESS)
    this.contract = contract
    return contract
  }

  async getTokenId(i: number) {
    return await this.contract.methods.tokenByIndex(i).call()
  }
}

export const bc = new Blockchain()
