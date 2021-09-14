import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select } from 'redux-saga/effects'
import { AlbumStateType } from 'stores/reducers/album/types'
import {
  getUserAlbumSuccess,
  getUserAlbumFailure,
  getUserAlbumRequest,
  addImageToAlbumSuccess,
  addImageToAlbumFailure,
  deleteImageFromAlbumSuccess,
  deleteImageFromAlbumFailure,
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

export function* deleteImageFromAlbum(api: IApi, { payload }: PayloadAction<{ imageId: number }>) {
  try {
    yield call(api, {
      url: APP_CONFIG.deleteAlbumImageById(payload.imageId),
    })
    const { album }: { album: AlbumStateType['album'] } = yield select((state) => state.album)
    const _album = album.filter((image) => Number(image.id) !== Number(payload.imageId))
    yield put(deleteImageFromAlbumSuccess({ album: _album }))
  } catch (e) {
    yield put(deleteImageFromAlbumFailure(e.message || e))
  }
}
