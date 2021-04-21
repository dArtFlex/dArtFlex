//@ts-nocheck
import { OpenSeaPort, Network } from 'opensea-js'
import { put } from 'redux-saga/effects'
import { IApi } from '../../services/types'
import Contract from 'web3-eth-contract'
import { ABI } from 'core'

export function* getAssetsData(api: IApi) {
  const wallet = new WalletService()
  yield wallet.connect()

  Contract.setProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
  const contract = new Contract(ABI, '0xC79BCBfF64A05e9cE790CEe3cC441b2E44035655')

  const tokenId = yield contract.methods.tokenByIndex(0).call()
  const item = yield contract.methods.tokenURI(tokenId).call()
  console.log(item)
}
