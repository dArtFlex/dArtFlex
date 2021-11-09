import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlaceBidStateType } from './types'

const initialState: PlaceBidStateType = {
  fetching: false,
  transacting: false,
  error: '',
  data: null,
  bidHistory: [],
  bidAmount: null,
  bidSuccess: '',
}

const placeBidSlice = createSlice({
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
      state.data = null
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
      state.transacting = true
    },
    acceptBidSuccess: (
      state,
      { payload }: PayloadAction<{ acceptBidTransaction: PlaceBidStateType['acceptBidTransaction'] }>
    ) => {
      state.transacting = false
      state.acceptBidTransaction = payload.acceptBidTransaction
      state.bidSuccess = 'Successfully accepted bid'
    },
    acceptBidFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.transacting = false
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

    getOffersRequest: (state, i) => {
      state.fetching = true
    },
    getOffersSuccess: (state, { payload }: PayloadAction<{ offers: PlaceBidStateType['offers'] }>) => {
      state.fetching = false
      state.offers = payload.offers
    },
    getOffersFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    cancelBidRequest: (state, i) => {
      state.fetching = true
    },
    cancelBidSuccess: (state) => {
      state.fetching = false
    },
    cancelBidFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    clearBidError: (state) => {
      state.error = ''
    },

    clearBidSuccessMessage: (state) => {
      state.bidSuccess = ''
    },

    claimBidRequest: (state, i) => {
      state.fetching = true
    },
    claimBidSuccess: (state) => {
      state.fetching = false
    },
    claimBidFailure: (state, { payload }: PayloadAction<string>) => {
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

  cancelBidRequest,
  cancelBidSuccess,
  cancelBidFailure,

  clearBidError,
  clearBidSuccessMessage,

  getOffersRequest,
  getOffersSuccess,
  getOffersFailure,

  claimBidRequest,
  claimBidSuccess,
  claimBidFailure,
} = placeBidSlice.actions

export const { reducer } = placeBidSlice
