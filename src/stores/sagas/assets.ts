//@ts-nocheck
import { put, call, all } from 'redux-saga/effects'
import Web3Service from 'services/web3_service'
import { getAssetsSuccess, getAssetsFailure } from 'stores/reducers/assets'
import { IApi } from '../../services/types'
import Contract from 'web3-eth-contract'
import { ABI } from 'core'

export function* getAssetsData(api: IApi) {
  new Web3Service()

  try {
    Contract.setProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
    const contract = new Contract(ABI, '0xC79BCBfF64A05e9cE790CEe3cC441b2E44035655')

    // todo: shoul be recheck as that cause error 429
    const assets = []
    let i = 0
    while (i < 10) {
      const token_id = yield contract.methods.tokenByIndex(i).call()
      const url = yield contract.methods.tokenURI(token_id).call()

      const data = yield call(api, { method: 'GET', url })
      assets.push({ token_id, ...data })
      i++
    }

    yield put(getAssetsSuccess(assets))
  } catch ({ message }) {
    yield put(getAssetsFailure(message))
  }
}
