import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuctionType } from './types'

const initialState: AuctionType = {
  fetching: false,
  error: '',
  bids: [],
}

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    createBidRequest: (state, { payload }: PayloadAction<{ tokenId: string }>) => {
      state.fetching = true
    },
    createBidSuccess: (state, { payload }: PayloadAction<string>) => {
      state.bids = Array.from(new Set([...state.bids, payload]))
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
