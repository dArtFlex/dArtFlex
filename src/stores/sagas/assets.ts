import { put, call, all } from 'redux-saga/effects'
import { getAssetsSuccess, getAssetsFailure } from 'stores/reducers/assets'
import { IApi } from '../../services/types'
import { AssetTypes, AssetDataTypes, AdditionalEntities } from 'types'
import { createDummyAssetData } from 'utils'

function* getAssetData(api: IApi, asset: AssetTypes) {
  try {
    const assetData: AssetDataTypes['data'] = yield call(api, {
      url: asset.uri,
    })
    const additionalEntities: AdditionalEntities = createDummyAssetData(assetData.id)
    return { ...asset, ...additionalEntities, data: assetData }
  } catch (e) {
    console.log(e)
  }
}

export function* getAssetsData(api: IApi) {
  try {
    const getAssetsListAll: AssetTypes[] = yield call(api, {
      url: 'http://dartflex-dev.ml:8888/api/item/get_all',
    })

    const getAssetsListAllData: AssetDataTypes[] = yield all(
      getAssetsListAll.map((asset) => call(getAssetData, api, asset))
    )

    yield put(getAssetsSuccess(getAssetsListAllData))
  } catch (e) {
    yield put(getAssetsFailure(e.message || e))
  }
}
