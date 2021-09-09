import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListingStateType } from './types'
import { IError } from 'types'

const initialState: ListingStateType = {
  fetching: false,
  fetchingDropPrice: false,
  error: '',
  data: {
    type: 'auction',
    startPrice: '',
    endPrice: '',
    start_time: '',
    end_time: '',
    salesTokenContract: '',
    platfromFee: '',
  },
  orderId: null,
  salesDetailId: null,
  listItemId: null,
  bidListItemId: null,
  listing: 'none',
}

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    listingRequest: (state, i) => {
      state.fetching = true
    },
    listingSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        orderId: ListingStateType['orderId']
        salesDetailId: ListingStateType['salesDetailId']
        listItemId: ListingStateType['listItemId']
        bidListItemId: ListingStateType['bidListItemId']
      }>
    ) => {
      state.fetching = false
      state.orderId = payload.orderId
      state.salesDetailId = payload.salesDetailId
      state.listItemId = payload.listItemId
      state.bidListItemId = payload.bidListItemId
      state.listing = 'done'
    },
    listingFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    unlistingRequest: (state, i) => {
      state.fetching = true
    },
    unlistingSuccess: (state) => {
      state.fetching = true
    },
    unlistingFailure: (state, { payload }: PayloadAction<IError>) => {
      state.error = payload
      state.fetching = false
    },

    clearListingData: (state) => {
      state.listing = 'none'
    },
    clearListingError: (state) => {
      state.error = ''
    },

    changePriceRequest: (state, i) => {
      state.fetchingDropPrice = true
    },
    changePriceSuccess: (state) => {
      state.fetchingDropPrice = false
      state.priceChanged = true
    },
    changePriceFailure: (state, { payload }: PayloadAction<IError>) => {
      state.error = payload
      state.fetchingDropPrice = false
      state.priceChanged = false
    },
    resetChangePrice: (state) => {
      state.priceChanged = undefined
    },
  },
})

export const {
  listingRequest,
  listingSuccess,
  listingFailure,

  unlistingRequest,
  unlistingSuccess,
  unlistingFailure,

  clearListingData,
  clearListingError,

  changePriceRequest,
  changePriceSuccess,
  changePriceFailure,
  resetChangePrice,
} = listingSlice.actions

export const { reducer } = listingSlice
