//@ts-nocheck
import { put, call, all } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAssetsAllSuccess,
  getAssetsAllFailure,
  getAssetByIdSuccess,
  getAssetByIdFailure,
} from 'stores/reducers/assets'
import { getUserDataByOwner } from 'stores/sagas/user'
import { IApi } from '../../services/types'
import { AssetTypes, AssetDataTypes, UserDataTypes, AssetMarketplaceTypes, AssetDataTypesWithStatuses } from 'types'
import APP_CONFIG from 'config'
import { getAssetStatus } from 'utils'

function* getAssetData(api: IApi, asset: Omit<AssetDataTypes, 'userData' | 'imageData'>) {
  try {
    const assetById: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(parseFloat(asset.item_id)),
    })
    const userData: UserDataTypes = yield call(getUserDataByOwner, api, assetById[0].owner)
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

    // Todo: Assets should be with extended statuses
    const getAssetsListAllWithStatuses = yield all(getAssetsListAllData.map((asset) => call(getMainAssetStatus, asset)))

    yield put(getAssetsAllSuccess(getAssetsListAllData))
  } catch (e) {
    yield put(getAssetsAllFailure(e.message || e))
  }
}

export function* getAssetById(api: IApi, { payload }: PayloadAction<number>) {
  try {
    const marketplaceData: AssetMarketplaceTypes[] = yield call(api, {
      url: APP_CONFIG.getMarketplaceItemById(Number(payload)),
    })
    const { item_id } = marketplaceData[0]
    const assetById: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(Number(item_id)),
    })

    const userByOwner: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserByWallet(assetById[0].owner),
    })
    const userByCreator: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserByWallet(assetById[0].creator),
    })
    const imageData: AssetDataTypes['imageData'][] = yield call(api, {
      url: assetById[0].uri,
    })

    yield put(
      getAssetByIdSuccess({
        tokenData: assetById[0],
        imageData: imageData[0],
        ownerData: userByOwner[0],
        creatorData: userByCreator[0],
        marketData: marketplaceData[0],
      })
    )
  } catch (e) {
    yield put(getAssetByIdFailure(e.message || e))
  }
}

function* getMainAssetStatus(asset) {
  try {
    const status = getAssetStatus({
      type: asset.type,
      start_price: asset.start_price,
      end_price: asset.end_price,
      start_time: asset.start_time as string,
      end_time: asset.end_time,
      sold: asset.sold,
    })

    return {
      ...asset,
      status,
    }
  } catch (e) {
    throw new Error(e.message || e)
  }
}
