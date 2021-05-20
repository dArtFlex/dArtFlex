//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select, delay } from 'redux-saga/effects'
import { loadImageSuccess, loadImageFailure, mintingSuccess, mintingFailure } from 'stores/reducers/minting'
import { MintingStateType } from 'stores/reducers/minting/types'
import { bc } from 'services/blockchain_service'
import { walletService } from 'services/wallet_service'

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
    // bc.newContract()
    // const minting = yield bc.mintNFT(tokenUri)
    const { accounts } = yield walletService.getAccoutns()
    yield call(api, {
      method: 'POST',
      url: 'http://3.11.202.153:8888/api/lazymint/create',
      data: {
        contract: '0x25646B08D9796CedA5FB8CE0105a51820740C049',
        tokenId: tokenId,
        uri: tokenUri,
        creator: accounts[0],
        royalty: accounts[0],
        signatures: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
    })

    yield put(mintingSuccess())
  } catch ({ message = '' }) {
    yield put(mintingFailure(message))
  }
}

// Question about:
//     image_data: 'messi card',
//     attribute: 'asdfasdfa',
