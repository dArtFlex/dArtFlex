import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStateType } from './types'

const initialState: UserStateType = {
  isOpenSideBar: true,
  balances: [],
  fetching: false,
  error: '',
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toogleSideBar: (state) => {
      state.isOpenSideBar = !state.isOpenSideBar
    },
    getUserDataRequest: (state, i) => {
      state.fetching = true
      state.error = ''
    },
    getUserDataSuccess: (state, { payload }: PayloadAction<{ userData: UserStateType['user'] }>) => {
      state.fetching = false
      state.user = payload.userData
    },
    getUserDataFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    createNewUserRequest: (state, i) => {
      state.fetching = true
      state.error = ''
    },
    createNewUserSuccess: (state, { payload }: PayloadAction<{ userData: UserStateType['user'] }>) => {
      state.fetching = false
      state.user = payload.userData
    },
    createNewUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getUserBalancesRequest: (state, i) => {
      state.fetching = true
      state.error = ''
    },
    getUserBalancesSuccess: (state, { payload }: PayloadAction<{ balances: UserStateType['balances'] }>) => {
      state.fetching = false
      state.balances = payload.balances
      state.error = ''
    },
    getUserBalancesFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },
  },
})

export const {
  toogleSideBar,
  getUserDataRequest,
  getUserDataSuccess,
  getUserDataFailure,

  createNewUserRequest,
  createNewUserSuccess,
  createNewUserFailure,

  getUserBalancesRequest,
  getUserBalancesSuccess,
  getUserBalancesFailure,
} = userSlice.actions

export const { reducer } = userSlice
