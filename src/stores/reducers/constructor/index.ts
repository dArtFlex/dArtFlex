import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConstructorStateType } from './types'

const initialState: ConstructorStateType = {
  fetching: false,
  cancelled: false,
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
      state.cancelled = false
    },
    createStyleTransferSuccess: (state, { payload }: PayloadAction<{ imageUrl: ConstructorStateType['imageUrl'] }>) => {
      state.imageUrl = payload.imageUrl
      state.fetching = false
    },
    createStyleTransferFailure: (state, { payload }: PayloadAction<{ code: number; message: string }>) => {
      state.error = payload
      state.fetching = false
    },
    cancelledStyleTransfer: (state) => {
      state.cancelled = true
      state.imageUrl = ''
      state.cancelled = false
      state.error = ''
    },
  },
})

export const {
  createStyleTransferRequest,
  createStyleTransferSuccess,
  createStyleTransferFailure,

  cancelledStyleTransfer,
} = constructorSlice.actions

export const { reducer } = constructorSlice
