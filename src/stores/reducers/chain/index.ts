import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChainStateType } from './types'

const initialState: ChainStateType = {
  chainId: 1,
  chainName: '__eth',
}

const chainSlice = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    switchChain: (
      state,
      { payload }: PayloadAction<{ chainId: ChainStateType['chainId']; chainName: ChainStateType['chainName'] }>
    ) => {
      localStorage.setItem('chainId', JSON.stringify(payload.chainId))
      state.chainId = payload.chainId
      state.chainName = payload.chainName
    },
  },
})

export const { switchChain } = chainSlice.actions

export const { reducer } = chainSlice
