import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { addHashtags } from 'stores/sagas/assets'
import { uploadImageSuccess, uploadImageFailure, lazyMintingSuccess, lazyMintingFailure } from 'stores/reducers/minting'
import { MintingStateType } from 'stores/reducers/minting/types'
import { lazyMintService } from 'services/lazymint_service'
import { walletService } from 'services/wallet_service'
import { contractAddress } from 'core/contracts/addresses'
import { ILazyMintData, IHashtag, IHashtagNew, UserDataTypes, IChainName } from 'types'
import { getIdFromString } from 'utils'
import APP_CONFIG from 'config'

export function* uploadImage(api: IApi, { payload: { file } }: PayloadAction<{ file: MintingStateType['file'] }>) {
  try {
    const formData = new FormData()
    formData.append('file', file as File)
    const image: string = yield call(api, {
      method: 'POST',
      url: APP_CONFIG.uploadImage,
      data: formData,
      transform: false,
    })

    yield put(uploadImageSuccess({ image, image_data: file?.name || '' }))
  } catch (e) {
    yield put(uploadImageFailure({ code: 4001, message: 'Image is too large!' }))
  }
}

export function* minting(
  api: IApi,
  {
    payload: { name, description, royalties, hashtags },
  }: PayloadAction<{
    name: MintingStateType['data']['name']
    description: MintingStateType['data']['description']
    royalties: MintingStateType['data']['royalties']
    hashtags: Array<IHashtag | IHashtagNew>
  }>
) {
  try {
    const { data }: { data: MintingStateType['data'] } = yield select((state) => state.minting)
    const { user }: { user: UserDataTypes } = yield select((state) => state.user)

    const hashtagsIds: number[] = hashtags.reduce((acc: number[], curr) => {
      if ((curr as IHashtag)?.id) {
        acc.push((curr as IHashtag).id)
        return acc
      }
      return acc
    }, [])
    const newHashtags: IHashtagNew[] = hashtags.reduce((acc: IHashtagNew[], curr) => {
      if ((curr as IHashtagNew)?.inputValue) {
        acc.push(curr as IHashtagNew)
        return acc
      }
      return acc
    }, [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newHashtagsIds: Array<null | number> = yield call(addHashtags as any, api, {
      payload: { hashtags: newHashtags },
    })

    const preparedData = {
      ...data,
      name,
      description,
    }

    const createMetadataId: string = yield call(api, {
      method: 'POST',
      url: APP_CONFIG.createMetadata,
      data: preparedData,
    })

    const tokenId = getIdFromString(createMetadataId)
    const tokenUri: string = APP_CONFIG.getMetadata(tokenId as number)
    const royalty: Array<{ account: string; value: string }> = [
      { account: walletService.getAccoutns()[0], value: royalties },
    ]

    const chain: IChainName = walletService.getChainKeyName()
    const lm: ILazyMintData = yield lazyMintService.generateLazyMint({
      body: {
        contract: chain && contractAddress[chain].erc721Rarible,
        uri: tokenUri,
        creator: walletService.getAccoutns()[0],
        royalty,
      },
    })

    const lazymint = true // true as primary sale
    const createItemId: string = yield call(api, {
      url: APP_CONFIG.createItem,
      method: 'POST',
      data: {
        contract: lm.contract,
        tokenId: lm.tokenId,
        uri: lm.uri,
        // creator and owner are same only in first sell
        chainId: walletService.getChainId(),
        creator: user.id,
        owner: user.id,
        royalty: JSON.stringify(royalty),
        royaltyFee: '',
        lazymint: lazymint,
        signature: lm.signatures[0],
        hashtagIdList: [...hashtagsIds, ...newHashtagsIds],
      },
    })
    const lazyMintItemId: number | null = getIdFromString(createItemId)

    yield put(lazyMintingSuccess({ lazyMintData: lm, lazyMintItemId, lazymint }))
  } catch (e) {
    yield put(lazyMintingFailure(e))
  }
}
