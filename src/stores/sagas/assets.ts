import { put, call, all } from 'redux-saga/effects'
import { getAssetsSuccess, getAssetsFailure } from 'stores/reducers/assets'
import { IApi } from '../../services/types'
import { AssetTypes, AssetDataTypes, AdditionalEntities, UserDataTypes } from 'types'
import { createDummyAssetData } from 'utils'
import APP_CONFIG from 'config'

function* getUserData(api: IApi, owner: string) {
  try {
    const userData: UserDataTypes = yield call(api, {
      url: APP_CONFIG.getUserProfileByOwner(owner),
    })
    return { user: userData }
  } catch (e) {
    yield put(getAssetsFailure(e.message || e))
  }
}

function* getAssetData(api: IApi, asset: AssetTypes) {
  try {
    const userData: UserDataTypes = yield call(getUserData, api, asset.owner)
    const assetData: AssetDataTypes['data'] = yield call(api, {
      url: asset.uri,
    })
    const randomId = parseInt(`${Math.random() * 10}`)
    const additionalEntities: AdditionalEntities = createDummyAssetData(randomId)
    return { ...asset, ...additionalEntities, data: assetData, ...userData }
  } catch (e) {
    yield put(getAssetsFailure(e.message || e))
  }
}

export function* getAssetsData(api: IApi) {
  try {
    const getAssetsListAll: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemAll,
    })

    const getAssetsListAllData: AssetDataTypes[] = yield all(
      getAssetsListAll.map((asset) => call(getAssetData, api, asset))
    )

    yield put(getAssetsSuccess(getAssetsListAllData))
  } catch (e) {
    yield put(getAssetsFailure(e.message || e))
  }
}
