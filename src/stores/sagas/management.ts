import { put, call, all } from 'redux-saga/effects'
import {
  getAllWorksSuccess,
  getAllWorksFailure,
  getAllUsersListSuccess,
  getAllUsersListFailure,
} from 'stores/reducers/management'
import { ManagementStateType } from 'stores/reducers/management/types'
import { IApi } from '../../services/types'
import { AssetTypes, UserDataTypes, AssetDataTypes } from 'types'
import APP_CONFIG from 'config'

function* composeWorkData(api: IApi, asset: AssetTypes) {
  const creatorData: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserProfileByUserId(Number(asset.creator)),
  })
  const ownerData: UserDataTypes[] = yield call(api, {
    url: APP_CONFIG.getUserProfileByUserId(Number(asset.owner)),
  })
  const imageData: AssetDataTypes['imageData'][] = yield call(api, {
    url: asset.uri,
  })
  return { ...asset, creatorData: creatorData[0], ownerData: ownerData[0], imageData: imageData[0] }
}

export function* getAllWorks(api: IApi) {
  try {
    const getItemAssetsAll: AssetTypes[] = yield call(api, {
      url: APP_CONFIG.getItemAll,
    })
    const works: ManagementStateType['works'] = yield all(getItemAssetsAll.map((it) => call(composeWorkData, api, it)))
    yield put(getAllWorksSuccess({ works }))
  } catch (e) {
    yield put(getAllWorksFailure(e.message || e))
  }
}

export function* getAllUsersList(api: IApi) {
  try {
    const users: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserAll,
    })
    yield put(getAllUsersListSuccess({ users }))
  } catch (e) {
    yield put(getAllUsersListFailure(e.message || e))
  }
}
