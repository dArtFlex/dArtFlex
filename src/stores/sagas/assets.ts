import { put, call, all, select } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAssetsAllSuccess,
  getAssetsAllFailure,
  getAssetByIdSuccess,
  getAssetByIdFailure,
  getExchangeRateTokensSuccess,
  getExchangeRateTokensFailure,
  getHashtagsAllSuccess,
  getHashtagsAllFailure,
} from 'stores/reducers/assets'
import { getUserDataById } from 'stores/sagas/user'
import { IApi } from '../../services/types'
import { walletService } from 'services/wallet_service'
import {
  AssetTypes,
  AssetDataTypes,
  UserDataTypes,
  AssetMarketplaceTypes,
  AssetDataTypesWithStatus,
  IChainId,
  IHashtagNew,
} from 'types'
import tokensAll from 'core/tokens'
import { getAssetStatus, createDummyMarketplaceData, getIdFromString } from 'utils'
import APP_CONFIG from 'config'
import appConst from 'config/consts'
import { AssetsStateType } from 'stores/reducers/assets/types'

const {
  STATUSES: { MINTED },
} = appConst

function* getAssetData(api: IApi, asset: AssetMarketplaceTypes, { owner, uri }: { owner: string; uri: string }) {
  try {
    const userData: UserDataTypes = yield call(getUserDataById, api, owner)
    const imageData: AssetDataTypes['imageData'][] = yield call(api, {
      url: uri,
    })

    return { ...asset, imageData: imageData[0], userData }
  } catch (e) {
    yield put(getAssetsAllFailure(e.message || e))
  }
}

export function* getAssetsAllData(api: IApi) {
  try {
    const getItemAssetsAll: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemAll,
    })
    const getMarketplactAssetsAll: AssetMarketplaceTypes[] = yield all(
      getItemAssetsAll.map((item) => call(getMarketplaceData, api, item.id))
    )
    const getAssetsListAllData: AssetDataTypes[] = yield all(
      getMarketplactAssetsAll
        .map((mpD) => (mpD ? mpD : createDummyMarketplaceData()))
        .map((asset, index) =>
          call(getAssetData, api, asset, { owner: getItemAssetsAll[index].owner, uri: getItemAssetsAll[index].uri })
        )
    )

    const getAssetsListAllWithStatuses: AssetDataTypesWithStatus[] = yield all(
      getAssetsListAllData.map((asset) => call(getMainAssetStatus, api, asset))
    )

    yield put(getAssetsAllSuccess(getAssetsListAllWithStatuses))
  } catch (e) {
    yield put(getAssetsAllFailure(e.message || e))
  }
}

export function* getAssetById(api: IApi, { payload }: PayloadAction<number>) {
  try {
    const marketplaceData: AssetMarketplaceTypes | undefined = yield call(getMarketplaceData, api, Number(payload))
    const { user }: { user: UserDataTypes } = yield select((state) => state.user)

    const assetById: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(Number(payload)),
    })
    const userByOwner: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(+assetById[0].owner),
    })
    const userByCreator: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(+assetById[0].creator),
    })
    const imageData: AssetDataTypes['imageData'][] = yield call(api, {
      url: assetById[0].uri,
    })

    let status
    if (marketplaceData) {
      status = getAssetStatus({
        type: marketplaceData.type,
        start_price: marketplaceData.start_price,
        end_price: marketplaceData.end_price,
        start_time: marketplaceData.start_time as string,
        end_time: marketplaceData.end_time,
        sold: marketplaceData.sold,
        creator: assetById[0].creator,
        owner: assetById[0].owner,
        isListed: Boolean(marketplaceData),
        userWallet: user ? user.wallet : undefined,
      })
    }

    yield put(
      getAssetByIdSuccess({
        status,
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

export function* getMarketplaceData(api: IApi, itemId: number) {
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

export function* getMainAssetStatus(api: IApi, asset: AssetDataTypes) {
  try {
    // When asset only minted then it doesn't have marked data and then item_id isn't be defined.
    if (asset.item_id.length === 0) {
      return {
        ...asset,
        status: MINTED,
      }
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
    })

    return {
      ...asset,
      status,
    }
  } catch (e) {
    throw new Error(e.message || e)
  }
}

function* getPrice(api: IApi, symbol: string) {
  try {
    const price: { [key: string]: number } = yield call(api, {
      url: APP_CONFIG.exchangeRate(symbol, 'USD'),
      method: 'GET',
    })
    return { priceUSD: price?.USD || 0 }
  } catch (e) {
    throw new Error(e.message || e)
  }
}

export function* getExchangeRateTokens(api: IApi) {
  try {
    const chainId: IChainId = walletService.getChainId()
    const tAll = tokensAll[chainId || '0x1']
    const rateUsd: Array<{ priceUSD: number }> = yield all(tAll.map((t) => call(getPrice, api, t.symbol)))
    const exchangeRates = tAll.map((t, i) => ({
      id: t.id,
      rateUsd: rateUsd[i].priceUSD,
      symbol: t.symbol,
    }))
    yield put(getExchangeRateTokensSuccess(exchangeRates))
  } catch (e) {
    yield put(getExchangeRateTokensFailure(e.message || e))
  }
}

export function* getHashtagsAll(api: IApi) {
  try {
    const hashtags: AssetsStateType['hashtags'] | undefined = yield call(api, {
      url: APP_CONFIG.getHashtagAll,
    })
    yield put(getHashtagsAllSuccess({ hashtags }))
  } catch (e) {
    yield put(getHashtagsAllFailure(e.message || e))
  }
}

export function* addHashtags(api: IApi, { payload }: PayloadAction<{ hashtags: IHashtagNew[] }>) {
  const hashtagsIds: string[] = yield all(
    payload.hashtags.map((ht) =>
      call(api, {
        url: APP_CONFIG.createHashtag,
        method: 'POST',
        data: {
          name: ht.inputValue,
        },
      })
    )
  )

  return hashtagsIds.map((ht) => getIdFromString(ht))
}
