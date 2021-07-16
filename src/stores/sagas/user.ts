import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put } from 'redux-saga/effects'
import { history } from '../../navigation'
import {
  getUserDataFailure,
  getUserDataSuccess,
  createNewUserSuccess,
  createNewUserFailure,
} from 'stores/reducers/user'
import { UserStateType } from 'stores/reducers/user/types'
import { IAccountSettings } from 'pages/AccountSettings/types'
import { UserDataTypes, IUserRole } from 'types'
import APP_CONFIG from 'config'
import appConst from 'config/consts'
import { getIdFromString } from 'utils'

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
