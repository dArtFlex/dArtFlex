import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssetsStateType } from './types'

const initialState: AssetsStateType = {
  fetching: false,
  error: '',
  assets: null,
  assetDetails: {
    imageData: null,
    tokenData: null,
    ownerData: null,
    creatorData: null,
    marketData: null,
  },
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getAssetsAllRequest: (state) => {
      state.fetching = true
    },
    getAssetsAllSuccess: (state, { payload }: PayloadAction<AssetsStateType['assets']>) => {
      state.assets = payload
      state.fetching = false
    },
    getAssetsAllFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
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
        imageData: AssetsStateType['assetDetails']['imageData']
        tokenData: AssetsStateType['assetDetails']['tokenData']
        ownerData: AssetsStateType['assetDetails']['ownerData']
        creatorData: AssetsStateType['assetDetails']['creatorData']
        marketData: AssetsStateType['assetDetails']['marketData']
      }>
    ) => {
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
} = assetsSlice.actions

export const { reducer } = assetsSlice
