import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBiddedOfferedAsset, UserStateType } from './types'
import { setRandomAvatar, setRandomCover } from '../../../utils'

const initialState: UserStateType = {
  isOpenSideBar: true,
  userAssets: [],
  userCollectedAssets: [],
  userSoldAssets: [],
  userCreatedAssets: [],
  userBids: [],
  promotionAssets: [],
  promotionIds: [],
  search: '',
  error: '',
  user: null,
  fetching: false,
  fetchingBids: false,
  fetchingPromo: false,
  fetchingTrading: false,
  fetchingAssets: false,
  isId: false,
  fetchingId: false,
  activeBids: [],
  success: '',
  biddedOfferedAssets: [],
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
      state.success = 'Changes saved'
      state.user = payload.userData
    },
    createNewUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getUserAssetsMetaRequest: (state, i) => {
      state.fetchingAssets = true
    },
    getUserAssetsMetaSuccess: (
      state,
      {
        payload,
      }: PayloadAction<
        Partial<{
          userAssets: UserStateType['userAssets']
          userCollectedAssets: UserStateType['userCollectedAssets']
          userSoldAssets: UserStateType['userSoldAssets']
          userCreatedAssets: UserStateType['userCreatedAssets']
        }>
      >
    ) => {
      state.userAssets = payload.userAssets || state.userAssets
      state.userCollectedAssets = payload.userCollectedAssets || state.userCollectedAssets
      state.userSoldAssets = payload.userSoldAssets || state.userSoldAssets
      state.userCreatedAssets = payload.userCreatedAssets || state.userCreatedAssets
      state.fetchingAssets = false
    },
    getUserAssetsMetaFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingAssets = false
    },

    getUserAssetsRequest: (state) => {
      state.fetching = true
    },
    getUserAssetsSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        userAssets: UserStateType['userAssets']
        userCollectedAssets: UserStateType['userCollectedAssets']
        userSoldAssets: UserStateType['userSoldAssets']
        userCreatedAssets: UserStateType['userCreatedAssets']
      }>
    ) => {
      state.fetching = false
      state.userAssets = payload.userAssets
      state.userCollectedAssets = payload.userCollectedAssets
      state.userSoldAssets = payload.userSoldAssets
      state.userCreatedAssets = payload.userCreatedAssets
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

    getBidsByUser: (state) => {
      state.fetching = true
    },

    getActiveBidsByUserRequest: (state) => {
      state.fetching = true
    },

    getActiveBidsByUserSuccess: (state, { payload }: PayloadAction<{ activeBids: UserStateType['activeBids'] }>) => {
      state.fetching = false
      state.activeBids = payload.activeBids
    },

    getActiveBidsByUserFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    addPromotionRequest: (state, i) => {
      state.fetchingPromo = true
    },
    addPromotionSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        promotionIdLastAdded: UserStateType['promotionIdLastAdded']
      }>
    ) => {
      state.fetchingPromo = false
      state.promotionIdLastAdded = payload.promotionIdLastAdded
    },
    addPromotionFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingPromo = false
    },

    deletePromotionRequest: (state, i) => {
      state.fetchingPromo = true
    },
    deletePromotionSuccess: (
      state,
      {
        payload,
      }: PayloadAction<{
        promotionIdLastDelete: UserStateType['promotionIdLastDelete']
      }>
    ) => {
      state.fetchingPromo = false
      state.promotionIdLastDelete = payload.promotionIdLastDelete
    },
    deletePromotionFailure: (state, { payload }: PayloadAction<string>) => {
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
    resetSearch: (state) => {
      state.search = ''
    },

    getAllUsersRequest: (state) => {
      state.fetching = true
    },
    getAllUsersSuccess: (state, { payload }: PayloadAction<{ userAll: UserStateType['userAll'] }>) => {
      state.fetching = false
      state.userAll = payload.userAll
    },
    getAllUsersFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetching = false
    },

    getTradingHistoryRequest: (state, i) => {
      state.fetchingTrading = true
    },
    getTradingHistorySuccess: (
      state,
      { payload }: PayloadAction<{ tradingHistoryAll: UserStateType['tradingHistoryAll'] }>
    ) => {
      state.fetchingTrading = false
      state.tradingHistoryAll = payload.tradingHistoryAll
    },
    getTradingHistoryFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingTrading = false
    },

    checkAssetIdRequest: (state, i) => {
      state.fetchingId = true
    },
    checkAssetIdSuccess: (state, { payload }: PayloadAction<{ isId: UserStateType['isId'] }>) => {
      state.isId = payload.isId
      state.fetchingId = false
    },
    checkAssetIdFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingId = false
    },

    updatePromotionRequest: (state, i) => {
      state.fetchingPromo = true
    },
    updatePromotionSuccess: (state) => {
      state.fetchingPromo = false
    },
    updatePromotionFailure: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.fetchingPromo = false
    },

    validateUserIdRequest: (state, i) => {
      state.userIdValid = false
    },
    validateUserIdSuccess: (state, { payload }: PayloadAction<{ userIdValid: boolean }>) => {
      state.userIdValid = payload.userIdValid
    },
    validateUserIdFailure: (state) => {
      state.userIdValid = false
    },

    clearUserError: (state) => {
      state.error = ''
    },

    clearUserSuccessMessage: (state) => {
      state.success = ''
    },

    deleteUserPhoto: (state, { payload }: PayloadAction<string>) => {
      if (state.user) {
        payload === 'profile_image'
          ? (state.user.profile_image = setRandomAvatar())
          : (state.user.cover_image = setRandomCover())
      }
    },

    getSalesDataByOwnerRequest: (state) => {
      state.fetching = true
    },

    getSalesDataByOwnerSuccess: (state, { payload }: PayloadAction<IBiddedOfferedAsset[]>) => {
      state.fetching = false
      state.biddedOfferedAssets = payload
    },

    getSalesDataByOwnerFailure: (state, { payload }: PayloadAction<string>) => {
      state.fetching = false
      state.error = payload
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

  getUserAssetsMetaRequest,
  getUserAssetsMetaSuccess,
  getUserAssetsMetaFailure,

  getUserAssetsRequest,
  getUserAssetsSuccess,
  getUserAssetsFailure,

  getUserBidsRequest,
  getUserBidsSuccess,
  getUserBidsFailure,

  getActiveBidsByUserRequest,
  getActiveBidsByUserSuccess,
  getActiveBidsByUserFailure,

  addPromotionRequest,
  addPromotionSuccess,
  addPromotionFailure,

  getPromotionRequest,
  getPromotionSuccess,
  getPromotionFailure,

  deletePromotionRequest,
  deletePromotionSuccess,
  deletePromotionFailure,

  setSearch,
  resetSearch,

  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,

  getTradingHistoryRequest,
  getTradingHistorySuccess,
  getTradingHistoryFailure,

  checkAssetIdRequest,
  checkAssetIdSuccess,
  checkAssetIdFailure,

  updatePromotionRequest,
  updatePromotionSuccess,
  updatePromotionFailure,

  validateUserIdRequest,
  validateUserIdSuccess,
  validateUserIdFailure,

  clearUserError,
  clearUserSuccessMessage,

  deleteUserPhoto,

  getSalesDataByOwnerRequest,
  getSalesDataByOwnerSuccess,
  getSalesDataByOwnerFailure,
} = userSlice.actions

export const { reducer } = userSlice
