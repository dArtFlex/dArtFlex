import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put } from 'redux-saga/effects'
import { history } from '../../navigation'
import { getUserDataFailure, getUserDataSuccess, createNewUserSuccess, createNewUserFailure } from '../reducers/user'
import { IAccountSettings } from 'pages/AccountSettings/types'
import APP_CONFIG from 'config'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* getUserData(api: IApi) {
  try {
    yield put(getUserDataSuccess({ id: 'user id' }))
  } catch ({ message = '' }) {
    localStorage.removeItem('token')
    history.push('/')
    yield put(getUserDataFailure(message))
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
    console.log(e)
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

    const response: string = yield call(api, {
      method: 'POST',
      url: 'http://3.11.202.153:8888/api/user/create',
      data: formData,
      transform: false,
    })

    // @ts-ignore: Unreachable code error
    const profileId = response.match(/\d/g).join('') || ''
    yield put(createNewUserSuccess(profileId))
  } catch ({ message = '' }) {
    yield put(createNewUserFailure(message))
  }
}
