import { createSlice } from '@reduxjs/toolkit'
import { AssetsStateType } from './types'

const initialState: AssetsStateType = {
  fetching: false,
  error: '',
  assets: [],
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    getAssetsRequest: (state) => {
      state.fetching = true
      state.error = ''
    },
  },
})

export const { getAssetsRequest } = assetsSlice.actions

export const { reducer } = assetsSlice
