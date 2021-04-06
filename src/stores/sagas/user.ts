import { IApi } from '../../services/types'
import { put } from 'redux-saga/effects'
import { history } from '../../navigation'
import { getUserDataFailure, getUserDataSuccess } from '../reducers/user'

export function* getUserData(api: IApi) {
  try {
    // const response = yield call(api, {
    //   url: appConfig.services.user,
    // })

    yield put(getUserDataSuccess({ id: 'user id' }))
  } catch ({ message = '' }) {
    localStorage.removeItem('token')
    history.push('/')
    yield put(getUserDataFailure(message))
  }
}
