import { createSlice } from '@reduxjs/toolkit'
import { WalletsStateType } from './types'

const initialState: WalletsStateType = {
  fetching: false,
  error: '',
  wallet: null,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectMetaMaskRequest: (state) => {
      state.fetching = true
    },
    connectMetaMaskSuccess: (state, { payload }) => {
      state.wallet = payload
      state.fetching = false
    },
    connectMetaMaskFailure: (state, { payload }) => {
      state.error = payload
      state.fetching = false
    },

    connnectTrustRequest: (state) => {
      state.fetching = true
    },
    connectTrustSuccess: (state, { payload }) => {
      state.wallet = payload
      state.fetching = false
    },
    connectTrustFailure: (state, { payload }) => {
      state.error = payload
      state.fetching = false
    },

    closeWarningModal: (state) => {
      state.error = ''
    },
  },
})

export const {
  connectMetaMaskRequest,
  connectMetaMaskSuccess,
  connectMetaMaskFailure,

  connnectTrustRequest,
  connectTrustSuccess,
  connectTrustFailure,

  closeWarningModal,
} = walletSlice.actions

export const { reducer } = walletSlice
