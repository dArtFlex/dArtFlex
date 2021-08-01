//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { addHashtags } from 'stores/sagas/assets'
import { uploadImageSuccess, uploadImageFailure, lazyMintingSuccess, lazyMintingFailure } from 'stores/reducers/minting'
import { MintingStateType } from 'stores/reducers/minting/types'
import { lazyMintService } from 'services/lazymint_service'
import { walletService } from 'services/wallet_service'
import { LAZY_MINT_ADDRESS } from 'core/contracts/lazy_mint_contract'
import { ILazyMintData, IHashtag, IHashtagNew } from 'types'
import APP_CONFIG from 'config'

function getIdFromString(v) {
  return +v.match(/\d/g).join('')
}

export function* uploadImage(api: IApi, { payload: { file } }: PayloadAction<{ file: MintingStateType['file'] }>) {
  try {
    const formData = new FormData()
    formData.append('file', file as File)
    const image = yield call(api, {
      method: 'POST',
      url: APP_CONFIG.uploadImage,
      data: formData,
      transform: false,
    })

    yield put(uploadImageSuccess({ image, image_data: file?.name }))
  } catch ({ message = '' }) {
    yield put(uploadImageFailure(message))
  }
}

export function* minting(
  api: IApi,
  {
    payload: { name, description, royalties, hashtags },
  }: PayloadAction<{
    data: MintingStateType['data']['name']
    description: MintingStateType['data']['description']
    royalties: MintingStateType['data']['royalties']
    hashtags: Array<IHashtag | IHashtagNew>
  }>
) {
  try {
    const { data }: ReturnType<typeof selector> = yield select((state) => state.minting)
    const { user }: { user: UserDataTypes } = yield select((state) => state.user)

    const hashtagsIds = hashtags.reduce((acc, curr) => {
      if (curr?.id) {
        acc.push(curr.id)
        return acc
      }
      return acc
    }, [])
    const newHashtags = hashtags.reduce((acc, curr) => {
      if (curr?.inputValue) {
        acc.push(curr)
        return acc
      }
      return acc
    }, [])
    const newHashtagsIds = yield call(addHashtags, api, { payload: { hashtags: newHashtags } })

    const preparedData = {
      ...data,
      name,
      description,
    }

    const createMetadataId = yield call(api, {
      method: 'POST',
      url: APP_CONFIG.createMetadata,
      data: preparedData,
    })

    const tokenId = getIdFromString(createMetadataId)
    const tokenUri = APP_CONFIG.getMetadata(tokenId)

    const lm: ILazyMintData = yield lazyMintService.generateLazyMint({
      body: {
        contract: LAZY_MINT_ADDRESS,
        uri: tokenUri,
        creator: walletService.getAccoutns()[0],
        royalty: royalties,
      },
    })

    const createItemId = yield call(api, {
      url: APP_CONFIG.createItem,
      method: 'POST',
      data: {
        contract: lm.contract,
        tokenId: lm.tokenId,
        uri: lm.uri,
        // creator and owner are same only in first sell
        creator: user.id,
        owner: user.id,
        royalty: '',
        royaltyFee: '',
        lazymint: true,
        signature: lm.signatures[0],
        hashtagIdList: [...hashtagsIds, ...newHashtagsIds],
      },
    })
    const lazyMintItemId: number = getIdFromString(createItemId)

    yield put(lazyMintingSuccess({ lazyMintData: lm, lazyMintItemId }))
  } catch (e) {
    yield put(lazyMintingFailure(e))
  }
}
