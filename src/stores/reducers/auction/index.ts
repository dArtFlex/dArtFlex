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
    createBidRequest: (state, { payload }: PayloadAction<{ tokenId: string; asset: any }>) => {
      state.fetching = true
    },
  },
})

export const { createBidRequest } = auctionSlice.actions

export const { reducer } = auctionSlice
