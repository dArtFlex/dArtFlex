import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStateType } from './types'

const initialState: UserStateType = {
  isOpenSideBar: true,
  fetching: false,
  error: '',
  user: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toogleSideBar: (state) => {
      state.isOpenSideBar = !state.isOpenSideBar
    },
    getUserDataRequest: (state) => {
      state.fetching = true
      state.error = ''
    },
    getUserDataSuccess: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.fetching = false
      state.user = payload
    },
    getUserDataFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const { toogleSideBar, getUserDataRequest, getUserDataSuccess, getUserDataFailure } = userSlice.actions

export const { reducer } = userSlice
