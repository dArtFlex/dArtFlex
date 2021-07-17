import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WalletsStateType } from './types'

const initialState: WalletsStateType = {
  fetching: false,
  error: '',
  wallet: null,
  tokensBalances: [],
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

    connnectWalletConnectRequest: (state) => {
      state.fetching = true
    },
    connnectWalletConnectSuccess: (state, { payload }) => {
      state.wallet = payload
      state.fetching = false
    },
    connnectWalletConnectFailure: (state, { payload }) => {
      state.error = payload
      state.fetching = false
    },

    closeWarningModal: (state) => {
      state.error = ''
    },

    getTokensBalancesRequest: (state, i) => {
      state.fetching = true
      state.error = ''
    },
    getTokensBalancesSuccess: (state, { payload }: PayloadAction<WalletsStateType['tokensBalances']>) => {
      state.fetching = false
      state.tokensBalances = payload
      state.error = ''
    },
    getTokensBalancesFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const {
  connectMetaMaskRequest,
  connectMetaMaskSuccess,
  connectMetaMaskFailure,

  connnectWalletConnectRequest,
  connnectWalletConnectSuccess,
  connnectWalletConnectFailure,

  closeWarningModal,

  getTokensBalancesRequest,
  getTokensBalancesSuccess,
  getTokensBalancesFailure,
} = walletSlice.actions

export const { reducer } = walletSlice
