import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MintingStateType } from './types'

const initialState: MintingStateType = {
  fetching: false,
  minting: 'none',
  error: '',
  file: null,
  data: {
    name: '',
    image: '',
    image_data: '',
    royalties: '',
    attribute: '',
    description: '',
  },
  lazyMintItemId: null,
}

const mintingSlice = createSlice({
  name: 'minting',
  initialState,
  reducers: {
    uploadImageRequest: (state, { payload: { file } }: PayloadAction<{ file: MintingStateType['file'] }>) => {
      state.file = file
      state.uploading = true
    },
    uploadImageSuccess: (
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
    uploadImageFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.uploading = false
    },

    lazyMintingRequest: (
      state,
      {
        payload: { name, description, royalties, hashtags },
      }: PayloadAction<{
        name: MintingStateType['data']['name']
        description: MintingStateType['data']['description']
        royalties: MintingStateType['data']['royalties']
        hashtags: MintingStateType['hashtags']
      }>
    ) => {
      state.data.name = name
      state.data.description = description
      state.data.royalties = royalties
      state.hashtags = hashtags
      state.minting = 'in progress'
    },
    lazyMintingSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        lazyMintData: MintingStateType['lazyMintData']
        lazyMintItemId: MintingStateType['lazyMintItemId']
      }>
    ) => {
      state.minting = 'done'
      state.lazyMintData = payload.lazyMintData
      state.lazyMintItemId = payload.lazyMintItemId
    },
    lazyMintingFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.minting = 'failed'
    },

    setLazyMintingData: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: MintingStateType['data']
        lazyMintItemId: number
        lazyMintData: {
          contract: string
          tokenId: string
          uri: string
          signatures: string[]
        }
      }>
    ) => {
      state.minting = 'done'
      state.data = payload.data
      state.lazyMintItemId = payload.lazyMintItemId
      state.lazyMintData = {
        contract: payload.lazyMintData.contract,
        tokenId: payload.lazyMintData.tokenId,
        uri: payload.lazyMintData.uri,
        signatures: payload.lazyMintData.signatures,
      }
    },

    clearLazyMintingData: (state) => {
      state.minting = 'none'
      state.data = {
        name: '',
        image: '',
        image_data: '',
        royalties: '',
        attribute: '',
        description: '',
      }
      state.lazyMintItemId = null
      state.lazyMintData = undefined
      state.file = null
    },
  },
})

export const {
  uploadImageRequest,
  uploadImageSuccess,
  uploadImageFailure,

  lazyMintingRequest,
  lazyMintingSuccess,
  lazyMintingFailure,

  setLazyMintingData,
  clearLazyMintingData,
} = mintingSlice.actions

export const { reducer } = mintingSlice
