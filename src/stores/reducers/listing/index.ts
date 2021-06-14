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
}

const userSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    listingRequest: (state) => {
      state.fetching = true
    },
    listingSuccess: (state) => {
      state.fetching = false
    },
    listingFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const { listingRequest, listingSuccess, listingFailure } = userSlice.actions

export const { reducer } = userSlice
