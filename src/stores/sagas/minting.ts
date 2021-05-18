//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select, delay } from 'redux-saga/effects'
import { loadImageSuccess, loadImageFailure, mintingSuccess, mintingFailure } from 'stores/reducers/minting'
import { MintingStateType } from 'stores/reducers/minting/types'
import { bc } from 'services/blockchain_service'

export function* loadImage(api: IApi, { payload: { file } }: PayloadAction<{ file: MintingStateType['file'] }>) {
  try {
    const formData = new FormData()
    formData.append('file', file as File)

    const image = yield call(api, {
      method: 'POST',
      url: 'http://3.11.202.153:8888/api/image/upload',
      data: formData,
      transform: false,
    })

    yield put(loadImageSuccess({ image, image_data: file?.name }))
  } catch ({ message = '' }) {
    yield put(loadImageFailure(message))
  }
}

export function* minting(
  api: IApi,
  {
    payload: { name, description },
  }: PayloadAction<{ data: MintingStateType['data']['name']; description: MintingStateType['data']['description'] }>
) {
  try {
    const { data }: ReturnType<typeof selector> = yield select((state) => state.minting)

    const preparedData = {
      ...data,
      name,
      description,
    }

    const response = yield call(api, {
      method: 'POST',
      url: 'http://3.11.202.153:8888/api/metadata/create',
      data: preparedData,
    })

    const tokenId = response.match(/\d/g).join('')
    const tokenUri = 'http://3.11.202.153:8888/api/metadata/get/' + tokenId

    // Todo: Shold be fixed from BE first
    bc.newContract()
    const minting = yield bc.mintNFT(tokenUri)

    yield put(mintingSuccess())
  } catch ({ message = '' }) {
    yield put(mintingFailure(message))
  }
}

// Question about:
//     image_data: 'messi card',
//     attribute: 'asdfasdfa',
