import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConstructorStateType } from './types'

const initialState: ConstructorStateType = {
  fetching: false,
  fetchingTrandfer: false,
  error: '',
  contentImage: null,
  styleImage: null,
  priority: 0,
  endScale: 1024,
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    createStyleTransferRequest: (state, i) => {
      state.fetching = true
      state.fetchingTrandfer = true
    },
    createStyleTransferSuccess: (state, { payload }: PayloadAction<{ transfer: ConstructorStateType['transfer'] }>) => {
      state.transfer = payload.transfer
      state.fetching = false
    },
    createStyleTransferFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getStyleTransferStatusRequest: (state, i) => {
      state.fetching = true
    },
  },
})

export const {
  createStyleTransferRequest,
  createStyleTransferSuccess,
  createStyleTransferFailure,
} = constructorSlice.actions

export const { reducer } = constructorSlice
