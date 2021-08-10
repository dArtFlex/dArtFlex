import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MakeOfferStateType } from './types'

const initialState: MakeOfferStateType = {
  fetching: false,
  error: '',
}

const makeOfferSlice = createSlice({
  name: 'makeoffer',
  initialState,
  reducers: {
    makeOfferRequest: (state, i) => {
      state.fetching = true
    },
    makeOfferSuccess: (state, { payload }: PayloadAction<{ offerId: MakeOfferStateType['offerId'] }>) => {
      state.fetching = false
      state.offerId = payload.offerId
    },
    makeOfferFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const { makeOfferRequest, makeOfferSuccess, makeOfferFailure } = makeOfferSlice.actions

export const { reducer } = makeOfferSlice
