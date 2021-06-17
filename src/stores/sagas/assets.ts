import { put, call, all } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAssetsAllSuccess,
  getAssetsAllFailure,
  getAssetByIdSuccess,
  getAssetByIdFailure,
} from 'stores/reducers/assets'
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
    yield put(getAssetsAllFailure(e.message || e))
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
    yield put(getAssetsAllFailure(e.message || e))
  }
}

export function* getAssetsAllData(api: IApi) {
  try {
    const getAssetsListAll: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemAll,
    })

    const getAssetsListAllData: AssetDataTypes[] = yield all(
      getAssetsListAll.map((asset) => call(getAssetData, api, asset))
    )

    yield put(getAssetsAllSuccess(getAssetsListAllData))
  } catch (e) {
    yield put(getAssetsAllFailure(e.message || e))
  }
}

export function* getAssetById(api: IApi, { payload }: PayloadAction<number>) {
  try {
    const getAssetByToken: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByTokenId(payload),
    })

    const imageData: AssetDataTypes['data'][] = yield call(api, {
      url: getAssetByToken[0].uri,
    })

    const randomId = parseInt(`${Math.random() * 10}`)
    const infoData: AdditionalEntities = createDummyAssetData(randomId)

    yield put(getAssetByIdSuccess({ tokenData: getAssetByToken[0], imageData: imageData[0], infoData }))
  } catch (e) {
    yield put(getAssetByIdFailure(e.message || e))
  }
}
