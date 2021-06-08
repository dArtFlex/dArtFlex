//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { loadImageSuccess, loadImageFailure, mintingSuccess, mintingFailure } from 'stores/reducers/minting'
import { MintingStateType } from 'stores/reducers/minting/types'
import { lazyMintService } from 'services/lazymint_service'
import { walletService } from 'services/wallet_service'
import { orderService } from 'services/order_service'

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

    const lm = yield lazyMintService.generateLazyMint({
      body: {
        contract: '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82',
        uri: tokenUri,
        creator: walletService.getAccoutns()[0],
      },
    })

    yield call(api, {
      url: 'http://dartflex-dev.ml:8888/api/item/create',
      method: 'POST',
      data: {
        contract: lm.contract,
        tokenId: lm.tokenId,
        uri: lm.uri,
        creator: lm.creators[0].account,
        owner: lm.creators[0].account,
        royalty: '',
        royaltyFee: '',
        lazymint: true,
        signature: lm.signatures[0],
      },
    })

    const order = yield orderService.generateOrder({
      body: {
        contract: lm.contract,
        tokenId: lm.tokenId,
        maker: '0x5c763f9C2111a61e154d0A05a526E332c12957CE',
        taker: '0x0000000000000000000000000000000000000000',
        price: '100000000000000000',
      },
    })
    console.log('ORDER: ', order)

    yield put(mintingSuccess())
  } catch (e) {
    yield put(mintingFailure(e))
  }
}
