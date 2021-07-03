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

    const getAssetsListAllWithStatuses: AssetDataTypesWithStatuses[] = yield all(
      getAssetsListAllData.map((asset) => call(getMainAssetStatus, api, asset))
    )

    yield put(getAssetsAllSuccess(getAssetsListAllWithStatuses))
  } catch (e) {
    yield put(getAssetsAllFailure(e.message || e))
  }
}

export function* getAssetById(api: IApi, { payload }: PayloadAction<number>) {
  try {
    const marketplaceData: AssetMarketplaceTypes | undefined = yield call(getMarketplaceData, api, payload)

    const assetById: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(Number(payload)),
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
        marketData: marketplaceData ? marketplaceData : null,
      })
    )
  } catch (e) {
    yield put(getAssetByIdFailure(e.message || e))
  }
}

function* getMarketplaceData(api: IApi, itemId: number) {
  try {
    const allMarketplace: AssetMarketplaceTypes[] = yield call(api, {
      url: APP_CONFIG.getMarketplaceAll,
    })
    const marketplaceData: AssetMarketplaceTypes | undefined = allMarketplace.find(
      (marketItem) => Number(marketItem.item_id) === itemId
    )
    return marketplaceData
  } catch (e) {
    throw new Error(e.message || e)
  }
}

function* getMainAssetStatus(api: IApi, asset: AssetDataTypes, itemId?: number) {
  try {
    let isListed
    if (itemId) {
      const marketplaceData: AssetMarketplaceTypes | undefined = yield call(getMarketplaceData, api, itemId)
      isListed = Boolean(marketplaceData)
    }
    const assetById: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(Number(asset.item_id)),
    })
    const status = getAssetStatus({
      type: asset.type,
      start_price: asset.start_price,
      end_price: asset.end_price,
      start_time: asset.start_time as string,
      end_time: asset.end_time,
      sold: asset.sold,
      creator: assetById[0].creator,
      owner: assetById[0].owner,
      isListed: isListed,
    })

    return {
      ...asset,
      status,
    }
  } catch (e) {
    throw new Error(e.message || e)
  }
}
