import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlaceBidStateType } from './types'

const initialState: PlaceBidStateType = {
  fetching: false,
  transacting: false,
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
      state.transacting = true
    },
    placeBidSuccess: (state, { payload }: PayloadAction<{ data: unknown }>) => {
      state.data = payload.data
      state.transacting = false
    },
    placeBidFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.transacting = false
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

    acceptBidRequest: (state, i) => {
      state.fetching = true
    },
    acceptBidSuccess: (
      state,
      { payload }: PayloadAction<{ acceptBidTransaction: PlaceBidStateType['acceptBidTransaction'] }>
    ) => {
      state.fetching = false
      state.acceptBidTransaction = payload.acceptBidTransaction
    },
    acceptBidFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getBidsRequest: (state, i) => {
      state.fetching = true
    },
    getBidsSuccess: (state, { payload }: PayloadAction<{ bids: PlaceBidStateType['bids'] }>) => {
      state.fetching = false
      state.bids = payload.bids
    },
    getBidsFailure: (state, { payload }: PayloadAction<string>) => {
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

  acceptBidRequest,
  acceptBidSuccess,
  acceptBidFailure,

  getBidsRequest,
  getBidsSuccess,
  getBidsFailure,
} = userSlice.actions

export const { reducer } = userSlice
