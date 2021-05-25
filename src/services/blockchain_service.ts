//@ts-nocheck
import Contract from 'web3-eth-contract'
import { ABI, NFT_CONTRACT_ADDRESS } from 'core'
import { OpenSeaPort, Network } from 'opensea-js'
import { walletService } from 'services/wallet_service'
import { web3Service } from './web3_service'

class Blockchain {
  newContract() {
    Contract.setProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
    const contract = new Contract(ABI, NFT_CONTRACT_ADDRESS)
    this.contract = contract
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

  async mintAndTransfer(tokenUri: string) {
    const accounts = walletService.getAccoutns()
    const web3 = web3Service.getWeb3()

    const contractAbi = JSON.parse(
      `[{ "inputs": [ { "components": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "uri", "type": "string" }, { "internalType": "address[]", "name": "creators", "type": "address[]" }, { "components": [ { "internalType": "address payable", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "internalType": "struct LibPart.Part[]", "name": "royalties", "type": "tuple[]" }, { "internalType": "bytes[]", "name": "signatures", "type": "bytes[]" } ], "internalType": "struct LibERC721LazyMint.Mint721Data", "name": "data", "type": "tuple" }, { "internalType": "address", "name": "to", "type": "address" } ], "name": "mintAndTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]`
    )
    const contract = new web3.eth.Contract(contractAbi, '0x25646B08D9796CedA5FB8CE0105a51820740C049')
    const nonce = accounts[0] + web3.utils.randomHex(12).slice(2)

    return await contract.methods
      .mintAndTransfer(
        [
          web3.utils.toBN(nonce).toString(),
          tokenUri,
          [accounts[0]],
          [],
          ['0x0000000000000000000000000000000000000000000000000000000000000000'],
        ],
        accounts[0]
      )
      .send({ from: accounts[0] })
  }
}

export const bc = new Blockchain()
