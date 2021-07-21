import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStateType } from './types'

const initialState: UserStateType = {
  isOpenSideBar: true,
  userAssets: [],
  userBids: [],
  promotionAssets: [],
  promotionIds: [],
  search: '',
  error: '',
  user: null,
  fetching: false,
  fetchingBids: false,
  fetchingPromo: false,
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
    getUserDataSuccess: (
      state,
      { payload }: PayloadAction<{ userData: UserStateType['user']; role: UserStateType['role'] }>
    ) => {
      state.fetching = false
      state.user = payload.userData
      state.role = payload.role
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

    getUserAssetsRequest: (state) => {
      state.fetching = true
    },
    getUserAssetsSuccess: (state, { payload }: PayloadAction<{ userAssets: UserStateType['userAssets'] }>) => {
      state.fetching = false
      state.userAssets = payload.userAssets
    },
    getUserAssetsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getUserBidsRequest: (state) => {
      state.fetchingBids = true
    },
    getUserBidsSuccess: (state, { payload }: PayloadAction<{ userBids: UserStateType['userBids'] }>) => {
      state.fetchingBids = false
      state.userBids = payload.userBids
    },
    getUserBidsFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingBids = false
    },

    setPromotionRequest: (state, i) => {
      state.fetchingPromo = true
    },
    setPromotionSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        promotionIds: UserStateType['promotionIds']
        promotionAssets: UserStateType['promotionAssets']
      }>
    ) => {
      state.fetchingPromo = false
      state.promotionAssets = payload.promotionAssets
      state.promotionIds = payload.promotionIds
    },
    setPromotionFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingPromo = false
    },

    getPromotionRequest: (state) => {
      state.fetchingPromo = true
    },
    getPromotionSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        promotionIds: UserStateType['promotionIds']
        promotionAssets: UserStateType['promotionAssets']
      }>
    ) => {
      state.fetchingPromo = false
      state.promotionAssets = payload.promotionAssets
      state.promotionIds = payload.promotionIds
    },
    getPromotionFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingPromo = false
    },

    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
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

  getUserAssetsRequest,
  getUserAssetsSuccess,
  getUserAssetsFailure,

  getUserBidsRequest,
  getUserBidsSuccess,
  getUserBidsFailure,

  setPromotionRequest,
  setPromotionSuccess,
  setPromotionFailure,

  getPromotionRequest,
  getPromotionSuccess,
  getPromotionFailure,

  setSearch,
} = userSlice.actions

export const { reducer } = userSlice
