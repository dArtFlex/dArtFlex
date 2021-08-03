import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ManagementStateType } from './types'

const initialState: ManagementStateType = {
  fetching: false,
  error: '',
  works: [],
  users: [],
}

const userSlice = createSlice({
  name: 'minting',
  initialState,
  reducers: {
    getAllWorksRequest: (state) => {
      state.fetching = true
    },
    getAllWorksSuccess: (state, { payload }: PayloadAction<{ works: ManagementStateType['works'] }>) => {
      state.works = payload.works
      state.error = ''
    },
    getAllWorksFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },

    getAllUsersListRequest: (state) => {
      state.fetching = true
    },
    getAllUsersListSuccess: (state, { payload }: PayloadAction<{ users: ManagementStateType['users'] }>) => {
      state.users = payload.users
      state.error = ''
    },
    getAllUsersListFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
  },
})

export const {
  getAllWorksRequest,
  getAllWorksSuccess,
  getAllWorksFailure,

  getAllUsersListRequest,
  getAllUsersListSuccess,
  getAllUsersListFailure,
} = userSlice.actions

export const { reducer } = userSlice
