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
} from 'stores/reducers/user'
import { getMarketplaceData, getMainAssetStatus } from 'stores/sagas/assets'
import { UserStateType } from 'stores/reducers/user/types'
import { IAccountSettings } from 'pages/AccountSettings/types'
import {
  UserDataTypes,
  IUserRole,
  AssetTypes,
  AssetDataTypes,
  AssetMarketplaceTypes,
  AssetDataTypesWithStatus,
  IBidsHistory,
  ISuperAdminEntities,
} from 'types'
import APP_CONFIG from 'config'
import appConst from 'config/consts'
import { getIdFromString } from 'utils'
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
    yield put(getUserDataFailure(e.message || e))
  }
}

export function* getUserDataById(api: IApi, id: string) {
  try {
    const userData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(Number(id)),
    })
    return userData[0]
  } catch (e) {
    throw new Error(e.message || e)
  }
}

function* uploadImage(api: IApi, file: File) {
  try {
    const formData = new FormData()
    formData.append('file', file as File)
    const imageUrl: string = yield call(api, {
      method: 'POST',
      url: APP_CONFIG.uploadImage,
      data: formData,
      transform: false,
    })
    return imageUrl
  } catch (e) {
    throw new Error(e.message || e)
  }
}

export function* createNewUser(
  api: IApi,
  { payload: { accountSettings, wallet } }: PayloadAction<{ accountSettings: IAccountSettings; wallet: string }>
) {
  try {
    const { profile_image, cover_image, fullname, userid, email, overview, socials } = accountSettings
    const { website, twitter, instagram, discord, facebook, youtube, tiktok, otherUrl } = socials

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profileImageUrl: string = yield call(uploadImage as any, api, profile_image)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coverImageUrl: string = yield call(uploadImage as any, api, cover_image)

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
  } catch ({ message = '' }) {
    yield put(createNewUserFailure(message))
  }
}

function* getOwnerAssetData(api: IApi, asset: AssetTypes, userData: UserDataTypes) {
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: asset.uri,
  })
  const marketplaceData: AssetMarketplaceTypes | undefined = yield call(getMarketplaceData, api, Number(asset.id))
  // We need to use dummy marketplace data in order to use common cards component
  const dummyMarketplaceData = {
    id: 0,
    item_id: '',
    type: appConst.TYPES.INSTANT_BY,
    start_price: '',
    end_price: '',
    start_time: '',
    end_time: '',
    platform_fee: '',
    sales_token_contract: '',
    sold: false,
    created_at: '',
    updated_at: '',
  }

  return { ...(marketplaceData || dummyMarketplaceData), imageData: imageData[0], userData, tokenData: asset }
}

export function* getUserAssets(api: IApi) {
  try {
    const { user }: { user: UserDataTypes } = yield select((state) => state.user)
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

    yield put(getUserAssetsSuccess({ userAssets: getAssetsListAllWithStatuses }))
  } catch (e) {
    yield put(getUserAssetsFailure(e.message || e))
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
    yield put(getUserBidsFailure(e.message || e))
  }
}

function* getUserBidAssetInfo(api: IApi, market_id: string, item_id: string, userBids: IBidsHistory) {
  const assetById: AssetTypes[] = yield call(api, {
    url: APP_CONFIG.getItemByItemId(Number(item_id)),
  })
  const userByOwner: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserByWallet(assetById[0].owner),
  })
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: assetById[0].uri,
  })
  const marketData: AssetMarketplaceTypes[] = yield call(api, {
    url: APP_CONFIG.getMarketplaceItemById(Number(market_id)),
  })

  return { ...userBids, imageData: imageData[0], ownerData: userByOwner[0], marketData: marketData[0] }
}

export function* addPromotion(api: IApi, { payload }: PayloadAction<{ promotionId: number }>) {
  try {
    const signature: { data: string; signature: string } = yield walletService.generateSignature()
    const response: ISuperAdminEntities = yield call(api, {
      url: APP_CONFIG.addPromotion,
      method: 'POST',
      data: {
        itemId: Number(payload.promotionId),
        ...signature,
      },
    })

    const promotionAssets: UserStateType['promotionAssets'] = yield all(
      response.id.map((pId: number) => call(getPromotionAssetById, api, pId))
    )
    yield put(addPromotionSuccess({ promotionAssets, promotionIds: response.id }))
  } catch (e) {
    yield put(addPromotionFailure(e.message || e))
  }
}

export function* deletePromotion(api: IApi, { payload }: PayloadAction<{ promotionId: number }>) {
  try {
    const signature: { data: string; signature: string } = yield walletService.generateSignature()
    const response: ISuperAdminEntities = yield call(api, {
      url: APP_CONFIG.deletePromotion,
      method: 'POST',
      data: {
        itemId: Number(payload.promotionId),
        ...signature,
      },
    })

    const promotionAssets: UserStateType['promotionAssets'] = yield all(
      response.id.map((pId: number) => call(getPromotionAssetById, api, pId))
    )
    yield put(deletePromotionSuccess({ promotionAssets, promotionIds: response.id }))
  } catch (e) {
    yield put(deletePromotionFailure(e.message || e))
  }
}

export function* getPromotion(api: IApi) {
  try {
    const promotionIdsData = localStorage.getItem('promotionIds')
    const promotionIds: UserStateType['promotionIds'] = promotionIdsData ? JSON.parse(promotionIdsData) : []
    if (!promotionIds.length) {
      yield put(addPromotionSuccess({ promotionIds, promotionAssets: [] }))
      return
    }

    const promotionAssets: UserStateType['promotionAssets'] = yield all(
      promotionIds.map((pId: number) => call(getPromotionAssetById, api, pId))
    )

    yield put(getPromotionSuccess({ promotionAssets, promotionIds }))
  } catch (e) {
    yield put(getPromotionFailure(e.message || e))
  }
}

function* getPromotionAssetById(api: IApi, assetId: number) {
  const marketplaceData: AssetMarketplaceTypes | undefined = yield call(getMarketplaceData, api, Number(assetId))
  const assetById: AssetTypes[] = yield call(api, {
    url: APP_CONFIG.getItemByItemId(Number(assetId)),
  })
  const userByOwner: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserProfileByUserId(Number(assetById[0].owner)),
  })
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: assetById[0].uri,
  })
  return {
    marketData: marketplaceData ? marketplaceData : null,
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
    yield put(getAllUsersFailure(e.message || e))
  }
}
