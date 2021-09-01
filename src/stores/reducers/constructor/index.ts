import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConstructorStateType } from './types'

const initialState: ConstructorStateType = {
  fetching: false,
  error: '',
  contentImage: null,
  styleImage: null,
  priority: 0,
  endScale: 1024,
}

const constructorSlice = createSlice({
  name: 'constractor',
  initialState,
  reducers: {
    createStyleTransferRequest: (state, i) => {
      state.fetching = true
    },
    createStyleTransferFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const { createStyleTransferRequest, createStyleTransferFailure } = constructorSlice.actions

export const { reducer } = constructorSlice
