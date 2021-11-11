import { put, call, all, select, delay } from 'redux-saga/effects'
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
  getAssetsAllMetaSuccess,
  getAssetsAllMetaFailure,
} from 'stores/reducers/assets'
import { getUserDataById } from 'stores/sagas/user'
import { setNetworkChain } from 'stores/reducers/wallet'
import { IApi } from '../../services/types'
import { walletService } from 'services/wallet_service'
import {
  AssetTypes,
  AssetDataTypes,
  UserDataTypes,
  AssetMarketplaceTypes,
  AssetDataTypesWithStatus,
  IChaintIdHexFormat,
  IHashtagNew,
  IBids,
  IBaseTokens,
  IMeta,
  IItemGetEntities,
} from 'types'
import tokensAll from 'core/tokens'
import { getAssetStatus, createDummyMarketplaceData, getIdFromString, networkConvertor } from 'utils'
import APP_CONFIG from 'config'
import appConst from 'config/consts'
import { AssetsStateType } from 'stores/reducers/assets/types'
import { convertTokenSymbol, supportedNetwork, getChainKeyByChainId } from 'utils'

const {
  STATUSES: { MINTED },
} = appConst

function* getAssetData(api: IApi, asset: AssetMarketplaceTypes, { owner, uri }: { owner: string; uri: string }) {
  try {
    const userData: UserDataTypes = yield call(getUserDataById, api, owner)
    if (uri.includes('null')) {
      return { ...asset, imageData: null, userData }
    }

    const imageData: AssetDataTypes['imageData'][] = yield call(api, {
      url: uri,
    })
    return { ...asset, imageData: imageData[0], userData }
  } catch (e) {
    yield put(getAssetsAllFailure(e))
  }
}

export function* getAssetsAllMetaContext(api: IApi) {
  const { meta }: { meta: AssetsStateType['meta'] } = yield select((state) => state.assets)
  yield call(getAssetsAllMeta, api, { payload: { ...meta } } as PayloadAction<Partial<AssetsStateType['meta']>>)
}

export function* getAssetsAllMeta(api: IApi, { payload }: PayloadAction<Partial<AssetsStateType['meta']>>) {
  try {
    const chainId: number = yield walletService.getChainIdAsync() || 1 // If chain isn't set then Ethereum chain is used
    const { fromPrice, toPrice, search, ...rest } = payload
    const metaData: Partial<IMeta> = { ...rest }
    fromPrice && Object.assign(metaData, fromPrice)
    toPrice && Object.assign(metaData, toPrice)
    search && Object.assign(metaData, search)

    let data = {}
    if (payload.type === 'reserve_not_met') {
      data = { ...metaData, status: 'listed', type: 'auction' }
    } else if (payload.type === 'auction') {
      data = { ...metaData, status: 'pending' }
    } else if (payload.type === 'instant_buy') {
      data = { ...metaData, sold: false }
    } else if (payload.type === 'sold') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, ...filters } = metaData
      data = { ...filters, sold: true }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type, sold, ...filters } = metaData
      data = { ...filters }
    }

    const response: IItemGetEntities[] = yield api({
      method: 'GET',
      url: APP_CONFIG.getItemAll_V2,
      data: {
        ...data,
        chain_id: chainId,
      },
    })
    yield delay(250)

    const getMarketplactAssetsAll: AssetMarketplaceTypes[] = response.map((asset) =>
      asset.marketplace ? { ...asset.marketplace, contract: asset.contract } : createDummyMarketplaceData()
    )
    const getAssetsListAllData: AssetDataTypes[] = getMarketplactAssetsAll.map((asset, i) => {
      return { ...asset, imageData: response[i].metadata, userData: response[i].user }
    })
    const getAssetsListAllWithStatuses: AssetDataTypesWithStatus[] = yield all(
      getAssetsListAllData.map((asset, i) =>
        call(getMainAssetStatus, api, asset, response[i].creator, response[i].owner)
      )
    )

    const assets: AssetsStateType['assets'] = getAssetsListAllWithStatuses.map((a, i) => {
      return {
        ...a,
        hashtag: response[i].hashtag,
        ban: response[i].ban,
        isBidded: response[i].bid.status === 'pending',
      }
    })
    yield put(getAssetsAllMetaSuccess(assets))
  } catch (e) {
    yield put(getAssetsAllMetaFailure(e || e.message))
  }
}

// !!!!!!!! Should be removed as outdated function !!!!!!!!
export function* getAssetsAllData(api: IApi) {
  try {
    const getItemAssetsAll: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemAll,
    })

    const getMarketplactAssetsAll: AssetMarketplaceTypes[] = getItemAssetsAll.map((asset) =>
      asset.marketplace.length ? { ...asset.marketplace[0], contract: asset.contract } : createDummyMarketplaceData()
    )

    const getAssetsListAllData: AssetDataTypes[] = yield all(
      getMarketplactAssetsAll.map((asset, index) =>
        call(getAssetData, api, asset, { owner: getItemAssetsAll[index].owner, uri: getItemAssetsAll[index].uri })
      )
    )

    const getAssetsListAllWithStatuses: AssetDataTypesWithStatus[] = yield all(
      getAssetsListAllData.map((asset, i) => call(getMainAssetStatus, api, asset))
    )

    const bidsHistory: boolean[] = yield all(getMarketplactAssetsAll.map((asset) => call(checkIsBidded, api, asset.id)))
    const assets = getAssetsListAllWithStatuses
      .map((a, i) => ({
        ...a,
        hashtag: getItemAssetsAll[i].hashtag,
        ban: getItemAssetsAll[i].ban,
        isBidded: bidsHistory[i],
      }))
      .map((item, index) => ({ ...item, item_id: `${getItemAssetsAll[index].id}` }))
    yield put(getAssetsAllSuccess(assets))
  } catch (e) {
    yield put(getAssetsAllFailure(e))
  }
}

function* checkIsBidded(api: IApi, market_id: number) {
  if (market_id) {
    const getHistory: IBids[] = yield call(api, {
      url: APP_CONFIG.getHistory(market_id),
    })
    return getHistory.length > 1
  }
  return false
}

export function* getAssetById(api: IApi, { payload }: PayloadAction<number>) {
  try {
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

    const marketplaceData = assetById[0].marketplace.length
      ? { ...assetById[0].marketplace[0], contract: assetById[0].contract }
      : null

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
        status: status ? status : 'minted',
        tokenData: assetById[0],
        imageData: imageData[0],
        ownerData: userByOwner[0],
        creatorData: userByCreator[0],
        marketData: marketplaceData,
      })
    )
  } catch (e) {
    yield put(getAssetByIdFailure(e))
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
    throw new Error(e)
  }
}

export function* getMainAssetStatus(api: IApi, asset: AssetDataTypes, creator?: string, owner?: string) {
  try {
    // When asset only minted then it doesn't have marked data and then item_id isn't be defined.
    if (asset?.item_id.length === 0) {
      return {
        ...asset,
        status: MINTED,
      }
    }

    let assetById: AssetTypes[] = []
    if (!creator && !owner) {
      const _assetById: AssetTypes[] = yield call(api, {
        url: APP_CONFIG.getItemByItemId(Number(asset.item_id)),
      })
      assetById = [..._assetById]
    }

    const status = getAssetStatus({
      type: asset.type,
      start_price: asset.start_price,
      end_price: asset.end_price,
      start_time: asset.start_time as string,
      end_time: asset.end_time,
      sold: asset.sold,
      creator: creator || assetById[0].creator,
      owner: owner || assetById[0].owner,
    })

    return {
      ...asset,
      status,
    }
  } catch (e) {
    throw new Error(e)
  }
}

function* getPrice(api: IApi, symbol: string) {
  try {
    const price: number = yield call(api, {
      url: APP_CONFIG.exchangeRateSafe(convertTokenSymbol(symbol)),
    })
    return { priceUSD: price || 0 }
  } catch (e) {
    throw new Error(e)
  }
}

export function* getExchangeRateTokens(api: IApi) {
  try {
    const chainId: number = yield walletService.getChainIdAsync()
    const chainName = getChainKeyByChainId(chainId)
    yield put(setNetworkChain({ chainName }))

    const convertChainId: IChaintIdHexFormat | number = networkConvertor(chainId)
    if (!supportedNetwork(convertChainId)) {
      return
    }
    if (typeof convertChainId !== 'number') {
      const tAll: IBaseTokens[] = tokensAll[convertChainId]
      const rateUsd: Array<{ priceUSD: number }> = yield all(tAll.map((t) => call(getPrice, api, t.symbol)))
      const exchangeRates = tAll.map((t, i) => ({
        id: t.id,
        rateUsd: rateUsd[i].priceUSD,
        symbol: t.symbol,
      }))
      yield put(getExchangeRateTokensSuccess(exchangeRates))
    }
  } catch (e) {
    yield put(getExchangeRateTokensFailure(e))
  }
}

export function* getHashtagsAll(api: IApi) {
  try {
    const hashtags: AssetsStateType['hashtags'] | undefined = yield call(api, {
      url: APP_CONFIG.getHashtagAll,
    })
    yield put(getHashtagsAllSuccess({ hashtags }))
  } catch (e) {
    yield put(getHashtagsAllFailure(e))
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
