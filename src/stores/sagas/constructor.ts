import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { IApi } from '../../services/types'
import { ConstructorStateType } from 'stores/reducers/constructor/types'
import { createStyleTransferFailure } from 'stores/reducers/constructor'
import APP_CONFIG from 'config'

export function* createStyleTransfer(
  api: IApi,
  {
    payload: { contentImage, styleImage, priority, endScale },
  }: PayloadAction<{
    contentImage: ConstructorStateType['contentImage']
    styleImage: ConstructorStateType['styleImage']
    priority: ConstructorStateType['priority']
    endScale: ConstructorStateType['endScale']
  }>
) {
  try {
    const formData = new FormData()
    formData.append('content_image', contentImage as File)
    formData.append('style_image', styleImage as File)

    const taskData: unknown = yield call(api, {
      url: APP_CONFIG.constructorStyleTransfer(priority, endScale),
      method: 'POST',
    })
  } catch (e) {
    yield put(createStyleTransferFailure(e))
  }
}
