import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BuyNowStateType } from './types'

const initialState: BuyNowStateType = {
  fetching: false,
  transacting: false,
  error: '',
}

const userSlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    buyNowRequest: (state, i) => {
      state.transacting = true
    },
    buyNowSuccess: (state, { payload }: PayloadAction<{ buyItemId: number }>) => {
      state.buyItemId = payload.buyItemId
      state.transacting = false
    },
    buyNowFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.transacting = false
    },
  },
})

export const { buyNowRequest, buyNowSuccess, buyNowFailure } = userSlice.actions

export const { reducer } = userSlice
