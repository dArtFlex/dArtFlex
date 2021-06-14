//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { uploadImageSuccess, uploadImageFailure, lazyMintingSuccess, lazyMintingFailure } from 'stores/reducers/minting'
import { MintingStateType } from 'stores/reducers/minting/types'
import { lazyMintService } from 'services/lazymint_service'
import { walletService } from 'services/wallet_service'
import { ILazyMintData } from 'types'

export function* uploadImage(api: IApi, { payload: { file } }: PayloadAction<{ file: MintingStateType['file'] }>) {
  try {
    const formData = new FormData()
    formData.append('file', file as File)
    const image = yield call(api, {
      method: 'POST',
      url: 'http://3.11.202.153:8888/api/image/upload',
      data: formData,
      transform: false,
    })

    yield put(uploadImageSuccess({ image, image_data: file?.name }))
  } catch ({ message = '' }) {
    yield put(uploadImageFailure(message))
  }
}

function getIdFromString(v) {
  return +v.match(/\d/g).join('')
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

    const createMetadataId = yield call(api, {
      method: 'POST',
      url: 'http://3.11.202.153:8888/api/metadata/create',
      data: preparedData,
    })

    const tokenId = getIdFromString(createMetadataId)
    const tokenUri = 'http://3.11.202.153:8888/api/metadata/get/' + tokenId

    const lm: ILazyMintData = yield lazyMintService.generateLazyMint({
      body: {
        contract: '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82',
        uri: tokenUri,
        creator: walletService.getAccoutns()[0],
      },
    })

    const createItemId = yield call(api, {
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
    const lazyMintItemId: number = getIdFromString(createItemId)

    yield put(lazyMintingSuccess({ lazyMintData: lm, lazyMintItemId }))
  } catch (e) {
    yield put(lazyMintingFailure(e))
  }
}
