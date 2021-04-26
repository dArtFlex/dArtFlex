//@ts-nocheck
import Web3 from 'web3'
import { put, delay } from 'redux-saga/effects'
import { bc } from 'services/blockchain_service'
import { OpenSeaPort, Network } from 'opensea-js'
import { getAssetsSuccess, getAssetsFailure } from 'stores/reducers/assets'
import { IApi } from '../../services/types'

import { TOKEN_ADDRESS } from 'core'

export function* getAssetsData(api: IApi) {
  try {
    bc.newContract()
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')

    // Network.Rinkeby for test
    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Rinkeby,
    })

    const assets = []
    let i = 0
    while (i < 10) {
      const tokenId = yield bc.getTokenId(i)

      const asset: OpenSeaAsset = yield seaport.api.getAsset({
        tokenAddress: TOKEN_ADDRESS,
        tokenId,
      })
      yield delay(500)

      assets.push({
        name: asset.name,
        image: asset.imageUrl,
        tokenId,
        description: asset.description,
        ...asset,
      })
      i++
    }

    yield put(getAssetsSuccess(assets))
  } catch (e) {
    yield put(getAssetsFailure(e.message || e))
  }
}
