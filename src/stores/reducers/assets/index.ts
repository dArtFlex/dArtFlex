import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssetsStateType, Asset } from './types'

const initialState: AssetsStateType = {
  fetching: false,
  error: '',
  assets: null,
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getAssetsRequest: (state) => {
      state.fetching = true
    },
    getAssetsSuccess: (state, { payload }: PayloadAction<Asset[]>) => {
      state.assets = payload
      state.fetching = false
    },
    getAssetsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const { getAssetsRequest, getAssetsSuccess, getAssetsFailure } = assetsSlice.actions

export const { reducer } = assetsSlice
