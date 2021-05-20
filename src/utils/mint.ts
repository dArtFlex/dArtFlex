//@ts-nocheck
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const axios = require('axios')
const ethers = require('ethers')

const os = require('os')
var json = require(os.homedir() + '/.ethereum/rinkeby.json')

const config = {
  private: json.key, // DO NOT PUSH PRIVATE KEY IN PUBLIC REPO! YOU PROBABLY SHOULD USE ENV VARIABLES HERE
  rpc: json.url,
  erc721ContractAddress: '0x25646B08D9796CedA5FB8CE0105a51820740C049',
  apiBaseUrl: 'https://api-staging.rarible.com',
}

const client = axios.create({
  baseURL: 'https://api-staging.rarible.com',
})

const maker = new HDWalletProvider(config.private, config.rpc)
const web3 = new Web3(maker)

const contractAbi = JSON.parse(
  `[{ "inputs": [ { "components": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "string", "name": "uri", "type": "string" }, { "internalType": "address[]", "name": "creators", "type": "address[]" }, { "components": [ { "internalType": "address payable", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "internalType": "struct LibPart.Part[]", "name": "royalties", "type": "tuple[]" }, { "internalType": "bytes[]", "name": "signatures", "type": "bytes[]" } ], "internalType": "struct LibERC721LazyMint.Mint721Data", "name": "data", "type": "tuple" }, { "internalType": "address", "name": "to", "type": "address" } ], "name": "mintAndTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]`
)
const contract = new web3.eth.Contract(contractAbi, config.erc721ContractAddress)

performMint(maker.getAddress())
  .then((x) => console.log('Hash:', x))
  .catch((error) => console.log('Mint error', error))

async function performMint(maker) {
  // const nonce = await getNonce(config.erc721ContractAddress, maker)
  const nonce = maker + web3.utils.randomHex(6).slice(2)
  console.log(nonce)
  const invocation = contract.methods.mintAndTransfer(
    [
      Web3.utils.toBN(nonce).toString(),
      'api/metadata/get/1',
      [maker],
      [],
      ['0x0000000000000000000000000000000000000000000000000000000000000000'],
    ],
    maker
  )
  // console.log(invocation.arguments)
  return new Promise(async (resolve, reject) => {
    web3.eth
      .sendTransaction({
        data: invocation.encodeABI(),
        to: config.erc721ContractAddress,
        from: maker,
        chainId: 4,
        gasPrice: '5000000000',
        gas: '10000000',
      })
      .once('transactionHash', resolve)
      .once('error', reject)
  })
}
