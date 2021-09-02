import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { ConstructorStateType } from 'stores/reducers/constructor/types'
import { createStyleTransferSuccess, createStyleTransferFailure } from 'stores/reducers/constructor'
import APP_CONFIG from 'config'
import APP_CONSTS from 'config/consts'
import { IApi } from '../../services/types'
import { ICreateStyleTransferEntities } from 'types'

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

    const transfer: ConstructorStateType['transfer'] = yield call(api, {
      url: APP_CONFIG.constructorStyleTransfer(priority, endScale),
      method: 'POST',
      data: formData,
      transform: false,
      auth: {
        username: APP_CONSTS.USER.AI[0],
        password: APP_CONSTS.USER.AI[1],
      },
    })

    yield put(createStyleTransferSuccess({ transfer }))
  } catch (e) {
    yield put(createStyleTransferFailure(e))
  }
}

export function* getStyleTransferStatus(
  api: IApi,
  { payload }: PayloadAction<{ task_id: ICreateStyleTransferEntities['task_id'] }>
) {
  try {
    yield call(api, {
      url: APP_CONFIG.getTransferStatus(payload.task_id),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      auth: {
        username: APP_CONSTS.USER.AI[0],
        password: APP_CONSTS.USER.AI[1],
      },
    })
    debugger
  } catch (e) {
    debugger
    throw Error(e)
  }
}
