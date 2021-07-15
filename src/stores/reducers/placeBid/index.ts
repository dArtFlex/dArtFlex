import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlaceBidStateType } from './types'

const initialState: PlaceBidStateType = {
  fetching: false,
  error: '',
  data: null,
  bidHistory: [],
  bidAmount: null,
}

const userSlice = createSlice({
  name: 'placeBid',
  initialState,
  reducers: {
    placeBidRequest: (state, i) => {
      state.fetching = true
    },
    placeBidSuccess: (state, { payload }: PayloadAction<{ data: unknown }>) => {
      state.data = payload.data
      state.fetching = false
    },
    placeBidFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getBidsHistoryRequest: (state) => {
      state.fetching = true
    },
    // eslint-disable-next-line
    getBidsHistorySuccess: (state, { payload }: PayloadAction<PlaceBidStateType['bidHistory']>) => {
      state.bidHistory = payload
      state.fetching = false
    },
    getBidsHistoryFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const {
  placeBidRequest,
  placeBidSuccess,
  placeBidFailure,
  getBidsHistoryRequest,
  getBidsHistorySuccess,
  getBidsHistoryFailure,
} = userSlice.actions

export const { reducer } = userSlice
