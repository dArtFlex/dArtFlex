import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssetsStateType } from './types'
import { IChainIdDecimalsFormat } from 'types'

const initialState: AssetsStateType = {
  fetching: false,
  fetchingAll: false,
  error: '',
  assets: null,
  assetDetails: {
    imageData: null,
    tokenData: null,
    ownerData: null,
    creatorData: null,
    marketData: null,
  },
  meta: {
    type: 'auction',
    sold: false,
    filter: 'ending_soon',
    search: '',
    hashtags: [],
    fromPrice: 0,
    toPrice: 0,
    hotOnly: false,
    limit: 20,
    offset: 0,
    order: 'DESC',
  },
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getAssetsAllRequest: (state) => {
      state.fetchingAll = true
    },
    getAssetsAllSuccess: (state, { payload }: PayloadAction<AssetsStateType['assets']>) => {
      state.assets = payload
      state.fetchingAll = false
    },
    getAssetsAllFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingAll = false
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAssetByIdRequest: (state, { payload }: PayloadAction<number>) => {
      state.fetching = true
    },
    getAssetByIdSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        status: AssetsStateType['assetDetails']['status']
        imageData: AssetsStateType['assetDetails']['imageData']
        tokenData: AssetsStateType['assetDetails']['tokenData']
        ownerData: AssetsStateType['assetDetails']['ownerData']
        creatorData: AssetsStateType['assetDetails']['creatorData']
        marketData: AssetsStateType['assetDetails']['marketData']
      }>
    ) => {
      state.assetDetails.status = payload.status
      state.assetDetails.imageData = payload.imageData
      state.assetDetails.tokenData = payload.tokenData
      state.assetDetails.ownerData = payload.ownerData
      state.assetDetails.creatorData = payload.creatorData
      state.assetDetails.marketData = payload.marketData
      state.fetching = false
    },
    getAssetByIdFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    clearAssetDetails: (state) => {
      state.assetDetails.imageData = null
      state.assetDetails.tokenData = null
      state.assetDetails.ownerData = null
      state.assetDetails.creatorData = null
      state.assetDetails.marketData = null
    },

    getExchangeRateTokensRequest: (state) => state,
    getExchangeRateTokensSuccess: (state, { payload }: PayloadAction<AssetsStateType['exchangeRates']>) => {
      state.exchangeRates = payload
      state.fetching = false
    },
    getExchangeRateTokensFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getHashtagsAllRequest: (state) => {
      state.fetching = true
    },
    getHashtagsAllSuccess: (state, { payload }: PayloadAction<{ hashtags: AssetsStateType['hashtags'] }>) => {
      state.hashtags = payload.hashtags
      state.fetching = false
    },
    getHashtagsAllFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    addHashtagsRequest: (state, i) => {
      state.fetching = true
    },
    addHashtagsSuccess: (state) => {
      state.fetching = false
    },
    addHashtagsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getAssetsAllMetaRequest: (
      state,
      { payload }: PayloadAction<Partial<AssetsStateType['meta'] & { chainIds: IChainIdDecimalsFormat[] }>>
    ) => {
      state.meta = { ...state.meta, ...payload }
      state.fetchingAll = true
    },
    getAssetsAllMetaSuccess: (state, { payload }: PayloadAction<AssetsStateType['assets']>) => {
      state.assets = payload
      state.fetchingAll = false
    },
    getAssetsAllMetaFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingAll = false
    },
    setAssetsAllMetaSearch: (state, { payload }: PayloadAction<string>) => {
      state.meta.search = payload
      state.meta.type = 'featured_artworks'
    },
    getAssetsAllMetaContextRequest: (state) => state,
  },
})

export const {
  getAssetsAllRequest,
  getAssetsAllSuccess,
  getAssetsAllFailure,

  getAssetByIdRequest,
  getAssetByIdSuccess,
  getAssetByIdFailure,

  clearAssetDetails,

  getExchangeRateTokensRequest,
  getExchangeRateTokensSuccess,
  getExchangeRateTokensFailure,

  getHashtagsAllRequest,
  getHashtagsAllSuccess,
  getHashtagsAllFailure,

  addHashtagsRequest,
  addHashtagsSuccess,
  addHashtagsFailure,

  getAssetsAllMetaRequest,
  getAssetsAllMetaSuccess,
  getAssetsAllMetaFailure,
  setAssetsAllMetaSearch,
  getAssetsAllMetaContextRequest,
} = assetsSlice.actions

export const { reducer } = assetsSlice
