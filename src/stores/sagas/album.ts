import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { AlbumStateType } from 'stores/reducers/album/types'
import {
  getUserAlbumSuccess,
  getUserAlbumFailure,
  getUserAlbumRequest,
  addImageToAlbumSuccess,
  addImageToAlbumFailure,
} from 'stores/reducers/album'
import APP_CONFIG from 'config'
import { IApi } from '../../services/types'

export function* getUserAlbum(api: IApi, { payload: { userId } }: PayloadAction<{ userId: number }>) {
  const album: AlbumStateType['album'] = yield call(api, {
    url: APP_CONFIG.getAlbumByUserId(userId),
  })
  yield put(getUserAlbumSuccess({ album }))
  try {
  } catch (e) {
    yield put(getUserAlbumFailure(e.message || e))
  }
}

export function* addImageToAlbum(
  api: IApi,
  { payload: { userId, imageUrl } }: PayloadAction<{ userId: number; imageUrl: string }>
) {
  try {
    const response: number[] = yield call(api, {
      url: APP_CONFIG.addImageToAlbum,
      method: 'POST',
      data: {
        userId,
        imageUrl,
      },
    })
    yield put(getUserAlbumRequest({ userId }))
    yield put(addImageToAlbumSuccess({ added: response, success: 'Image was added to album' }))
  } catch (e) {
    yield put(addImageToAlbumFailure(e.message || e))
  }
}
