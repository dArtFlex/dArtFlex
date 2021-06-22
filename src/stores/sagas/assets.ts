import { put, call, all } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAssetsAllSuccess,
  getAssetsAllFailure,
  getAssetByIdSuccess,
  getAssetByIdFailure,
} from 'stores/reducers/assets'
import { IApi } from '../../services/types'
import { AssetTypes, AssetDataTypes, UserDataTypes, AssetMarketplaceTypes } from 'types'
import APP_CONFIG from 'config'

function* getUserData(api: IApi, owner: string) {
  try {
    const userData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByOwner(owner),
    })
    return userData[0]
  } catch (e) {
    yield put(getAssetsAllFailure(e.message || e))
  }
}

function* getAssetData(api: IApi, asset: Omit<AssetDataTypes, 'userData' | 'imageData'>) {
  try {
    const assetById: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(parseFloat(asset.item_id)),
    })
    const userData: UserDataTypes = yield call(getUserData, api, assetById[0].owner)
    const imageData: AssetDataTypes['imageData'][] = yield call(api, {
      url: assetById[0].uri,
    })

    return { ...asset, imageData: imageData[0], userData }
  } catch (e) {
    yield put(getAssetsAllFailure(e.message || e))
  }
}

export function* getAssetsAllData(api: IApi) {
  try {
    const getAssetsListAll: AssetMarketplaceTypes[] = yield call(api, {
      url: APP_CONFIG.getMarketplaceAll,
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
    const assetById: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(payload),
    })
    const marketplaceData: AssetMarketplaceTypes[] = yield call(api, {
      url: APP_CONFIG.getMarketplaceItemById(payload),
    })
    const userByOwner: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserByWallet(assetById[0].owner),
    })
    const imageData: AssetDataTypes['imageData'][] = yield call(api, {
      url: assetById[0].uri,
    })

    yield put(
      getAssetByIdSuccess({
        tokenData: assetById[0],
        imageData: imageData[0],
        ownerData: userByOwner[0],
        marketData: marketplaceData[0],
      })
    )
  } catch (e) {
    yield put(getAssetByIdFailure(e.message || e))
  }
}
