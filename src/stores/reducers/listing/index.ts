import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListingStateType } from './types'

const initialState: ListingStateType = {
  fetching: false,
  error: '',
  data: {
    type: 'auction',
    startPrice: '',
    endPrice: '',
    startTime: '',
    endTime: '',
    salesTokenContract: '',
    platfromFee: '',
  },
  orderId: null,
  salesDetailId: null,
  listItemId: null,
  bidListItemId: null,
  listing: 'none',
}

const userSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    listingRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload }: PayloadAction<{ data: Omit<ListingStateType['data'], 'salesTokenContract'> }>
    ) => {
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
  },
})

export const { listingRequest, listingSuccess, listingFailure } = userSlice.actions

export const { reducer } = userSlice
