import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuctionType } from './types'

const initialState: AuctionType = {
  fetching: false,
  error: '',
}

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    createBidRequest: (state, { payload }: PayloadAction<{ tokenId: string }>) => {
      state.fetching = true
    },
    createBidSuccess: (state) => {
      state.fetching = false
    },
    createBidFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const { createBidRequest, createBidSuccess, createBidFailure } = auctionSlice.actions

export const { reducer } = auctionSlice
