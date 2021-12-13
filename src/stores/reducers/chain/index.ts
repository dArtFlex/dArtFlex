import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChainStateType } from './types'

const initialState: ChainStateType = {
  chainIds: [56, 137, 4, 97], // @todo: Add 1
  chainNames: ['__bsc', '__polygon', '__ethRinkeby', '__bscTestnet'], // @todo: Add _eth
}

const chainSlice = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    switchChain: (
      state,
      { payload }: PayloadAction<{ chainIds: ChainStateType['chainIds']; chainNames: ChainStateType['chainNames'] }>
    ) => {
      localStorage.setItem('chainIds', JSON.stringify(payload.chainIds))
      state.chainIds = payload.chainIds
      state.chainNames = payload.chainNames
    },
  },
})

export const { switchChain } = chainSlice.actions

export const { reducer } = chainSlice
