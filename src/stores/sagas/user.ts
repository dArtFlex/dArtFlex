import { IApi } from '../../services/types'
import { put } from 'redux-saga/effects'
import { history } from '../../navigation'
import { getUserDataFailure, getUserDataSuccess } from '../reducers/user'

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
