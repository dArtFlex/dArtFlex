import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStateType } from './types'
import { IAccountSettings } from 'pages/AccountSettings/types'

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

    createNewUserRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      { payload }: PayloadAction<{ accountSettings: IAccountSettings; wallet: string }>
    ) => {
      state.fetching = true
      state.error = ''
    },
    createNewUserSuccess: (state, { payload }: PayloadAction<string>) => {
      state.fetching = false
      state.user.profileId = payload
    },
    createNewUserFailure: (state, { payload }: PayloadAction<string>) => {
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
} = userSlice.actions

export const { reducer } = userSlice
