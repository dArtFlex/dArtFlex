import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlbumStateType } from './types'

const initialState: AlbumStateType = {
  fetching: false,
  error: '',
  album: [],
  success: '',
}

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    getUserAlbumRequest: (state, i) => {
      state.fetching = true
    },
    getUserAlbumSuccess: (state, { payload }: PayloadAction<{ album: AlbumStateType['album'] }>) => {
      state.fetching = false
      state.album = payload.album
    },
    getUserAlbumFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    addImageToAlbumRequest: (state, i) => {
      state.fetching = true
    },
    addImageToAlbumSuccess: (
      state,
      { payload }: PayloadAction<{ added: AlbumStateType['added']; success: string }>
    ) => {
      state.fetching = false
      state.added = payload.added
      state.success = payload.success
    },
    addImageToAlbumFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    clearAlbumSuccessMessage: (state) => {
      state.success = ''
    },
  },
})

export const {
  getUserAlbumRequest,
  getUserAlbumSuccess,
  getUserAlbumFailure,

  addImageToAlbumRequest,
  addImageToAlbumSuccess,
  addImageToAlbumFailure,

  clearAlbumSuccessMessage,
} = albumSlice.actions

export const { reducer } = albumSlice
