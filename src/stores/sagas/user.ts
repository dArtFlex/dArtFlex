import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put } from 'redux-saga/effects'
import { history } from '../../navigation'
import { getUserDataFailure, getUserDataSuccess, createNewUserSuccess, createNewUserFailure } from '../reducers/user'
import { IAccountSettings } from 'pages/AccountSettings/types'

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

export function* createNewUser(
  api: IApi,
  { payload: { accountSettings, wallet } }: PayloadAction<{ accountSettings: IAccountSettings; wallet: string }>
) {
  try {
    // Todo: BE should add socials entities
    const { profile_image, cover_image, fullname, userid, email, overview } = accountSettings

    const formData = new FormData()
    formData.append('profile_image', profile_image as File)
    formData.append('cover_image', cover_image as File)
    formData.append('fullname', fullname)
    formData.append('userid', userid)
    formData.append('email', email)
    formData.append('wallet', wallet)
    formData.append('overview', overview)

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
