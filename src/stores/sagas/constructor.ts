import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { ConstructorStateType } from 'stores/reducers/constructor/types'
import { createStyleTransferSuccess, createStyleTransferFailure } from 'stores/reducers/constructor'
import APP_CONFIG from 'config'
import { IApi } from '../../services/types'

export function* createStyleTransfer(
  api: IApi,
  {
    payload: { contentImage, styleImage },
  }: PayloadAction<{
    contentImage: ConstructorStateType['contentImage']
    styleImage: ConstructorStateType['styleImage']
    priority: ConstructorStateType['priority']
    endScale: ConstructorStateType['endScale']
  }>
) {
  try {
    const formData = new FormData()
    formData.append('file1', contentImage as File)
    formData.append('file2', styleImage as File)

    const name: ConstructorStateType['imageUrl'] = yield call(api, {
      url: APP_CONFIG.constructorStyleTransferSafe,
      method: 'POST',
      data: formData,
      transform: false,
    })

    // const response: string = yield call(api, {
    //   url: APP_CONFIG.getGenerateImage(name),
    // })
    // Todo: Btoa should be done in a backend side as mobile doen't have window object
    // const convertToUTF8 = unescape(encodeURIComponent(response))
    // const b64Response = window.btoa(convertToUTF8)
    // const image = new Image()
    // image.src = `data:image/png;base64,${b64Response}`

    yield put(createStyleTransferSuccess({ imageUrl: APP_CONFIG.getGenerateImage(name) }))
  } catch (e) {
    yield put(createStyleTransferFailure(e))
  }
}
