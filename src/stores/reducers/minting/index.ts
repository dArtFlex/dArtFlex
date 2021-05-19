import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MintingStateType, IProcess } from './types'

const initialState: MintingStateType = {
  fetching: false,
  minting: 'none',
  error: '',
  file: null,
  data: {
    name: '',
    image: '',
    image_data: '',
    attribute: '', // unnecessary field
    description: '',
  },
}

const userSlice = createSlice({
  name: 'minting',
  initialState,
  reducers: {
    loadImageRequest: (state, { payload: { file } }: PayloadAction<{ file: MintingStateType['file'] }>) => {
      state.file = file
      state.uploading = true
    },
    loadImageSuccess: (
      state,
      {
        payload: { image, image_data },
      }: PayloadAction<{ image: MintingStateType['data']['image']; image_data: MintingStateType['data']['image_data'] }>
    ) => {
      state.data.image = image
      state.data.image_data = image_data
      state.uploading = false
      state.error = ''
    },
    loadImageFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.uploading = false
    },

    mintingRequest: (
      state,
      {
        payload: { name, description },
      }: PayloadAction<{
        name: MintingStateType['data']['name']
        description: MintingStateType['data']['description']
      }>
    ) => {
      state.data.name = name
      state.data.description = description
      state.minting = 'in progress'
    },
    mintingSuccess: (state) => {
      state.minting = 'done'
    },
    mintingFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.minting = 'failed'
    },
  },
})

export const {
  loadImageRequest,
  loadImageSuccess,
  loadImageFailure,
  mintingRequest,
  mintingSuccess,
  mintingFailure,
} = userSlice.actions

export const { reducer } = userSlice
