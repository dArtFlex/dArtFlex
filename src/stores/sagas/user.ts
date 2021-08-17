//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select, all } from 'redux-saga/effects'
import { history } from '../../navigation'
import {
  getUserDataFailure,
  getUserDataSuccess,
  createNewUserSuccess,
  createNewUserFailure,
  getUserAssetsSuccess,
  getUserAssetsFailure,
  getUserBidsSuccess,
  getUserBidsFailure,
  getPromotionSuccess,
  getPromotionFailure,
  addPromotionSuccess,
  addPromotionFailure,
  deletePromotionSuccess,
  deletePromotionFailure,
  getAllUsersSuccess,
  getAllUsersFailure,
  getTradingHistorySuccess,
  getTradingHistoryFailure,
  checkAssetIdSuccess,
  checkAssetIdFailure,
  updatePromotionFailure,
  updatePromotionSuccess,
  validateUserIdSuccess,
  validateUserIdFailure,
  getActiveBidsByUserSuccess,
  getActiveBidsByUserFailure,
} from 'stores/reducers/user'
import { getMainAssetStatus } from 'stores/sagas/assets'
import { IActiveUserBids, UserStateType } from 'stores/reducers/user/types'
import { IAccountSettings } from 'pages/AccountSettings/types'
import {
  UserDataTypes,
  IUserRole,
  AssetTypes,
  AssetDataTypes,
  AssetMarketplaceTypes,
  AssetDataTypesWithStatus,
  IBidsHistory,
  IAddPromotionEntities,
  IPromotionId,
  ITradingHistory,
} from 'types'
import APP_CONFIG from 'config'
import appConst from 'config/consts'
import { getIdFromString, createDummyMarketplaceData, setDummyAccount } from 'utils'
import { walletService } from 'services/wallet_service'

export function* getUserData(api: IApi, { payload }: PayloadAction<{ wallet: string }>) {
  try {
    const userData: UserStateType['user'][] = yield call(api, {
      url: APP_CONFIG.getUserByWallet(payload.wallet),
    })
    const userRole: IUserRole = appConst.USER.SECRET_KEYS.some(
      (i) => i.toLocaleLowerCase() === payload.wallet.toLocaleLowerCase()
    )
      ? 'ROLE_SUPER_ADMIN'
      : 'ROLE_COMMON'

    yield put(getUserDataSuccess({ userData: userData[0], role: userRole }))
  } catch ({ message = '' }) {
    history.push('/')
    yield put(getUserDataFailure(message))
  }
}

export function* getUserDataByOwner(api: IApi, owner: string) {
  try {
    const userData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByOwner(owner),
    })
    return userData[0]
  } catch (e) {
    yield put(getUserDataFailure(e))
  }
}

export function* getUserDataById(api: IApi, id: string) {
  try {
    const userData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(Number(id)),
    })
    return userData[0]
  } catch (e) {
    throw new Error(e)
  }
}

function* uploadImage(api: IApi, file: File) {
  const formData = new FormData()
  formData.append('file', file as File)
  const imageUrl: string = yield call(api, {
    method: 'POST',
    url: APP_CONFIG.uploadImage,
    data: formData,
    transform: false,
  })
  return imageUrl
}

export function* initialConnection(api: IApi, { payload }: PayloadAction<{ accounts: string }>) {
  const userData: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserByWallet(payload.accounts),
  })
  if (!userData.length) {
    yield call(createNewUser, api, {
      payload: {
        accountSettings: { ...setDummyAccount(), userid: payload.accounts, wallet: payload.accounts },
        wallet: payload.accounts,
        isNewProfileImage: false,
        isNewCoverImage: false,
      },
    })
  }
}

export function* createNewUser(
  api: IApi,
  {
    payload: { accountSettings, wallet, isNewProfileImage, isNewCoverImage },
  }: PayloadAction<{
    accountSettings: IAccountSettings
    wallet: string
    isNewProfileImage: boolean
    isNewCoverImage: boolean
  }>
) {
  try {
    const { profile_image, cover_image, fullname, userid, email, overview, ...socials } = accountSettings
    const { website, twitter, instagram, discord, facebook, youtube, tiktok, other_url: otherUrl } = socials

    const profileImageUrl: string = isNewProfileImage ? yield call(uploadImage, api, profile_image) : profile_image
    const coverImageUrl: string = isNewCoverImage ? yield call(uploadImage, api, cover_image) : cover_image

    const formData = new FormData()
    formData.append('profile_image', profileImageUrl)
    formData.append('cover_image', coverImageUrl)
    formData.append('fullname', fullname)
    formData.append('userid', userid)
    formData.append('email', email)
    formData.append('wallet', wallet)
    formData.append('overview', overview)
    formData.append('website', website)
    formData.append('twitter', twitter)
    formData.append('instagram', instagram)
    formData.append('discord', discord)
    formData.append('facebook', facebook)
    formData.append('youtube', youtube)
    formData.append('tiktok', tiktok)
    formData.append('otherUrl', otherUrl)

    const checkUserByWallet: UserStateType['user'][] = yield call(api, {
      url: APP_CONFIG.getUserByWallet(wallet),
    })
    const url = checkUserByWallet.length ? APP_CONFIG.updateUserProfile : APP_CONFIG.createUserProfile
    if (checkUserByWallet.length && checkUserByWallet[0] !== null) {
      formData.append('id', `${checkUserByWallet[0].id}`)
    }

    const userProfileId: string = yield call(api, {
      method: 'POST',
      url,
      data: formData,
      transform: false,
    })

    const userData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(getIdFromString(userProfileId) as number),
    })

    yield put(createNewUserSuccess({ userData: userData[0] }))
  } catch (e) {
    const code: number = getIdFromString(e)
    if (code === 413) {
      yield put(createNewUserFailure('User image or cover image is too large!'))
      return
    }
    yield put(createNewUserFailure(e))
  }
}

function* getOwnerAssetData(api: IApi, asset: AssetTypes, userData: UserDataTypes) {
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: asset.uri,
  })

  const marketplaceData = asset.marketplace?.length ? asset.marketplace[0] : createDummyMarketplaceData()
  // We need to use dummy marketplace data in order to use common cards component
  return { ...marketplaceData, imageData: imageData[0], userData, tokenData: asset }
}

export function* getUserAssets(api: IApi) {
  try {
    const { user }: { user: UserDataTypes } = yield select((state) => state.user)
    // All User Assets
    const getAllItemByOwnerId: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemsByOwnerId(user.id),
    })
    const getAssetsListAllData: Array<
      AssetDataTypes & {
        tokenData: AssetTypes
      }
    > = yield all(getAllItemByOwnerId.map((asset) => call(getOwnerAssetData, api, asset, user)))

    const getAssetsListAllWithStatuses: Array<
      AssetDataTypesWithStatus & {
        tokenData: AssetTypes
      }
    > = yield all(getAssetsListAllData.map((asset) => call(getMainAssetStatus, api, asset)))

    // Purchased Assets
    const userCollectedAssets: IBidsHistory[] = yield call(api, {
      url: APP_CONFIG.getPurchasedHistoryByUser(user.id),
    })
    const getAllCollectedItemById: AssetTypes[] = yield all(
      userCollectedAssets.map((asset) =>
        call(api, {
          url: APP_CONFIG.getItemByItemId(+asset.item_id),
        })
      )
    )

    const getAssetsListCollectedData: Array<
      AssetDataTypesWithStatus & {
        tokenData: AssetTypes
      }
    > = yield all(getAllCollectedItemById.flat().map((asset) => call(getOwnerAssetData, api, asset, user)))

    const getAssetsListCollectedWithStatuses: Array<
      AssetDataTypesWithStatus & {
        tokenData: AssetTypes
      }
    > = yield all(getAssetsListCollectedData.map((asset) => call(getMainAssetStatus, api, asset)))

    // Sold Asset
    const userSolddAssets: IBidsHistory[] = yield call(api, {
      url: APP_CONFIG.getSoldHistoryByUser(user.id),
    })
    const getAllSoldItemById: AssetTypes[] = yield all(
      userSolddAssets.map((asset) =>
        call(api, {
          url: APP_CONFIG.getItemByItemId(+asset.item_id),
        })
      )
    )

    const getAssetsListSoldData: Array<
      AssetDataTypesWithStatus & {
        tokenData: AssetTypes
      }
    > = yield all(getAllSoldItemById.flat().map((asset) => call(getOwnerAssetData, api, asset, user)))

    const getAssetsListSoldWithStatuses: Array<
      AssetDataTypesWithStatus & {
        tokenData: AssetTypes
      }
    > = yield all(getAssetsListSoldData.map((asset) => call(getMainAssetStatus, api, asset)))

    yield put(
      getUserAssetsSuccess({
        userAssets: getAssetsListAllWithStatuses,
        userCollectedAssets: getAssetsListCollectedWithStatuses,
        userSolddAssets: getAssetsListSoldWithStatuses,
      })
    )
  } catch (e) {
    yield put(getUserAssetsFailure(e))
  }
}

export function* getUserBids(api: IApi) {
  try {
    const { user }: { user: UserDataTypes } = yield select((state) => state.user)
    const userBids: IBidsHistory[] = yield call(api, {
      url: APP_CONFIG.getBidsByUserId(user.id),
    })

    const composeUserBidsData: UserStateType['userBids'] = yield all(
      userBids.map((bid) => call(getUserBidAssetInfo, api, bid.market_id, bid.item_id, bid))
    )
    yield put(getUserBidsSuccess({ userBids: composeUserBidsData }))
  } catch (e) {
    yield put(getUserBidsFailure(e))
  }
}

export function* getActiveBidsByUser(api: IApi) {
  try {
    const { user }: { user: UserDataTypes } = yield select((state) => state.user)
    const activeBids: IActiveUserBids[] = yield call(api, {
      url: APP_CONFIG.getActiveUserBidsById(user.id),
    })
    yield put(getActiveBidsByUserSuccess({ activeBids: activeBids }))
  } catch (e) {
    yield put(getActiveBidsByUserFailure(e))
  }
}

function* getUserBidAssetInfo(api: IApi, market_id: string, item_id: string, userBids: IBidsHistory) {
  const assetById: AssetTypes[] = yield call(api, {
    url: APP_CONFIG.getItemByItemId(Number(item_id)),
  })
  const userByOwner: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getBidsByUserId(Number(assetById[0].owner)),
  })
  const userProfileByOwner: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserProfileByUserId(Number(assetById[0].owner)),
  })
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: assetById[0].uri,
  })
  const marketData: AssetMarketplaceTypes[] = yield call(api, {
    url: APP_CONFIG.getMarketplaceItemById(Number(market_id)),
  })

  return {
    ...userBids,
    item_id,
    imageData: imageData[0],
    marketData: marketData[0],
    ownerData: userByOwner[0],
    ownerProfile: userProfileByOwner[0],
  }
}

export function* addPromotion(api: IApi, { payload }: PayloadAction<{ promotionId: number }>) {
  try {
    const promotionData: IAddPromotionEntities = yield call(_addPromotion, api, Number(payload.promotionId))
    yield put(addPromotionSuccess({ promotionIdLastAdded: promotionData.id[0] }))
  } catch (e) {
    yield put(addPromotionFailure(e))
  }
}

function* _addPromotion(api: IApi, promotionId: number) {
  const signature: { data: string; signature: string } = yield walletService.generateSignature()
  const promotionData: IAddPromotionEntities = yield call(api, {
    url: APP_CONFIG.addPromotion,
    method: 'POST',
    data: {
      itemId: Number(promotionId),
      ...signature,
    },
  })
  return promotionData
}

export function* deletePromotion(
  api: IApi,
  { payload }: PayloadAction<{ promotionItemId: number; promotionId: number }>
) {
  try {
    yield call(_deletePromotion, api, payload.promotionItemId)
    yield put(deletePromotionSuccess({ promotionIdLastDelete: payload.promotionId }))
  } catch (e) {
    yield put(deletePromotionFailure(e))
  }
}

function* _deletePromotion(api: IApi, promotionItemId: number) {
  const signature: { data: string; signature: string } = yield walletService.generateSignature()
  yield call(api, {
    url: APP_CONFIG.deletePromotion,
    method: 'POST',
    data: {
      itemId: Number(promotionItemId),
      ...signature,
    },
  })
}

export function* getPromotion(api: IApi) {
  try {
    const promotionIds: UserStateType['promotionIds'] = yield call(api, { url: APP_CONFIG.getPromotionAll })
    const promotionAssets: UserStateType['promotionAssets'] = yield all(
      promotionIds.map((promo: IPromotionId) => call(getPromotionAssetById, api, Number(promo.item_id)))
    )

    yield put(getPromotionSuccess({ promotionAssets, promotionIds }))
  } catch (e) {
    yield put(getPromotionFailure(e))
  }
}

function* getPromotionAssetById(api: IApi, assetId: number) {
  const assetById: AssetTypes[] = yield call(api, {
    url: APP_CONFIG.getItemByItemId(Number(assetId)),
  })
  const userByOwner: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserProfileByUserId(Number(assetById[0].owner)),
  })
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: assetById[0].uri,
  })

  const marketplaceData = assetById[0].marketplace.length ? assetById[0].marketplace[0] : null
  return {
    marketData: marketplaceData,
    ownerData: userByOwner[0],
    imageData: imageData[0],
    tokenData: assetById[0],
  }
}

export function* getAllUsers(api: IApi) {
  try {
    const userAll: UserStateType['userAll'] = yield call(api, {
      url: APP_CONFIG.getUserAll,
    })

    yield put(getAllUsersSuccess({ userAll }))
  } catch (e) {
    yield put(getAllUsersFailure(e))
  }
}

export function* tradingHistory(api: IApi, { payload }: PayloadAction<{ userId: number }>) {
  try {
    const tradingHistoryByUser: ITradingHistory[] = yield call(api, {
      url: APP_CONFIG.getHistoryTradingByUserId(payload.userId),
    })
    const promotionAssets: UserStateType['promotionAssets'] = yield all(
      tradingHistoryByUser.map((th) => call(getPromotionAssetById, api, Number(th.item_id)))
    )
    const fromUser: UserDataTypes[] = yield all(
      tradingHistoryByUser.map((th) => call(getUserDataById, api, parseFloat(th.from) ? th.from : th.to))
    )
    const toUser: UserDataTypes[] = yield all(
      tradingHistoryByUser.map((th) => call(getUserDataById, api, parseFloat(th.to) ? th.to : th.from))
    )

    const composeData = tradingHistoryByUser.flatMap((h, i) => ({
      ...h,
      imageData: promotionAssets[i].imageData,
      fromUserData: fromUser[i],
      toUserData: toUser[i],
    }))
    yield put(getTradingHistorySuccess({ tradingHistoryAll: composeData }))
  } catch (e) {
    yield put(getTradingHistoryFailure(e))
  }
}

export function* checkAssetId(api: IApi, { payload }: PayloadAction<{ item_id: string }>) {
  try {
    const getAsset: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemByItemId(+payload.item_id),
    })

    yield put(checkAssetIdSuccess({ isId: Boolean(getAsset.length) }))
  } catch (e) {
    yield put(checkAssetIdFailure(e))
  }
}

export function* updatePromotion(api: IApi, { payload }: PayloadAction<{ promotionIds: string[] }>) {
  try {
    const currentPromotionIds: UserStateType['promotionIds'] = yield call(api, { url: APP_CONFIG.getPromotionAll })
    yield all(currentPromotionIds.map((p: IPromotionId) => call(_deletePromotion, api, Number(p.item_id))))
    yield all(payload.promotionIds.map((p: string) => call(_addPromotion, api, Number(p))))

    yield put(updatePromotionSuccess())
  } catch (e) {
    yield put(updatePromotionFailure(e))
  }
}

export function* validateUserId(api: IApi, { payload }: PayloadAction<{ userId: string }>) {
  try {
    yield call(api, {
      url: APP_CONFIG.userValidation,
      method: 'POST',
      data: {
        userId: payload.userId,
      },
    })
    yield put(validateUserIdSuccess({ userIdValid: true }))
  } catch (e) {
    yield put(validateUserIdFailure())
  }
}
