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

    walletsDisconetRequest: (state) => {
      state.fetching = true
    },
    walletsDisconeSuccess: (state) => {
      state.wallet = null
      state.fetching = false
    },
    walletsDisconeFailure: (state, { payload }) => {
      state.error = payload
      state.fetching = false
    },

    walletsHistoryRequest: (state) => {
      state.fetching = true
    },
    walletsHistorySuccess: (state) => {
      state.fetching = false
    },
    walletsHistoryFailure: (state, { payload }) => {
      state.error = payload
      state.fetching = false
    },

    setNetworkChain: (state, { payload }: PayloadAction<{ chainName: WalletsStateType['chainName'] }>) => {
      state.chainName = payload.chainName
    },

    walletError: (state, { payload }: PayloadAction<{ error: string }>) => {
      state.error = payload.error
    },
    chainErrorRequest: (state, { payload }: PayloadAction<WalletsStateType['chainError']>) => {
      state.chainError = payload
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

  getTokensBalancesRequest,
  getTokensBalancesSuccess,
  getTokensBalancesFailure,

  walletsDisconetRequest,
  walletsDisconeSuccess,
  walletsDisconeFailure,

  walletsHistoryRequest,
  walletsHistorySuccess,
  walletsHistoryFailure,

  setNetworkChain,
  walletError,

  chainErrorRequest,
} = walletSlice.actions

export const { reducer } = walletSlice
