import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MakeOfferStateType } from './types'

const initialState: MakeOfferStateType = {
  fetching: false,
  error: '',
  success: '',
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

    clearMakeOfferError: (state) => {
      state.error = ''
    },

    clearMakeOfferSuccessMessage: (state) => {
      state.success = ''
    },

    cancelOfferRequest: (state, i) => {
      state.fetching = true
    },

    cancelOfferSuccess: (state, { payload }: PayloadAction<string>) => {
      state.success = payload
      state.fetching = false
    },

    cancelOfferFailure: (state, { payload }: PayloadAction<string>) => {
      state.fetching = false
      state.error = payload
    },

    acceptOfferRequest: (state, i) => {
      state.fetching = true
    },
    acceptOfferSuccess: (
      state,
      { payload }: PayloadAction<{ acceptOfferTransaction: MakeOfferStateType['acceptOfferTransaction'] }>
    ) => {
      state.fetching = false
      state.acceptOfferTransaction = payload.acceptOfferTransaction
    },
    acceptOfferFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const {
  makeOfferRequest,
  makeOfferSuccess,
  makeOfferFailure,

  clearMakeOfferError,
  clearMakeOfferSuccessMessage,

  cancelOfferRequest,
  cancelOfferSuccess,
  cancelOfferFailure,

  acceptOfferRequest,
  acceptOfferSuccess,
  acceptOfferFailure,
} = makeOfferSlice.actions

export const { reducer } = makeOfferSlice
