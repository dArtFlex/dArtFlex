//@ts-nocheck
import { put, delay } from 'redux-saga/effects'
import { contract } from 'services/contract_service'
import { web3Service } from 'services/web3_service'
import { getAssetsSuccess, getAssetsFailure } from 'stores/reducers/assets'
import { IApi } from '../../services/types'
import { createDummyAssetData } from 'utils'
import { NFT_CONTRACT_ADDRESS } from 'core'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* getAssetsData(api: IApi) {
  try {
    // Network.Rinkeby for test
    const web3 = yield web3Service.setWeb3OpenSeaProvider()
    const seaport = yield contract.setSeaport(web3.currentProvider)

    const assets = []
    let i = 0
    while (i < 10) {
      const tokenId = yield contract.getTokenId(i)

      const asset: OpenSeaAsset = yield seaport.api.getAsset({
        tokenAddress: NFT_CONTRACT_ADDRESS,
        tokenId,
      })
      yield delay(500)

      assets.push({
        name: asset.name,
        image: asset.imageUrl,
        tokenId,
        description: asset.description,
        ...asset,
        ...createDummyAssetData(i),
      })
      i++
    }

    yield put(getAssetsSuccess(assets))
  } catch (e) {
    yield put(getAssetsFailure(e.message || e))
  }
}
