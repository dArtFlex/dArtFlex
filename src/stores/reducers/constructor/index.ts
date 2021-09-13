import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConstructorStateType } from './types'

const initialState: ConstructorStateType = {
  fetching: false,
  error: '',
  contentImage: null,
  styleImage: null,
  priority: 0,
  endScale: 1024,
  imageUrl: '',
  album: [],
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    createStyleTransferRequest: (state, i) => {
      state.fetching = true
    },
    createStyleTransferSuccess: (state, { payload }: PayloadAction<{ imageUrl: ConstructorStateType['imageUrl'] }>) => {
      state.imageUrl = payload.imageUrl
      state.fetching = false
    },
    createStyleTransferFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const {
  createStyleTransferRequest,
  createStyleTransferSuccess,
  createStyleTransferFailure,
} = constructorSlice.actions

export const { reducer } = constructorSlice
