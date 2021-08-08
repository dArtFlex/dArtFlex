//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { makeOfferSuccess, makeOfferFailure } from 'stores/reducers/makeOffer'
import { walletService } from 'services/wallet_service'
import { placeBidService } from 'services/placebid_service'
import APP_CONFIG from 'config'
import { getIdFromString } from 'utils'
import tokensAll from 'core/tokens'
import { UserDataTypes } from 'types'

export function* makeOffer(api: IApi, { payload: { amount } }: PayloadAction<{ amount: string }>) {
  try {
    const chainId: IChainId = walletService.getChainId()
    const tokenContractWETH = tokensAll[chainId].find((t) => t.symbol === 'WETH').id
    const { tokenData }: ReturnType<typeof selector> = yield select((state) => state.assets.assetDetails)
    const { id: userId }: ReturnType<typeof selector> = yield select((state) => state.user.user)
    const accounts = walletService.getAccoutns()
    const endPrice = yield web3.utils.toWei(amount, 'ether') // offer amounnt

    // Todo: Should only be once, so we need to check if it's approved
    yield placeBidService.approveToken(accounts[0])

    const tokenCreatorData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(tokenData.creator),
    })

    const order = yield placeBidService.generateOrder({
      body: {
        contract: tokenData.contract,
        tokenId: tokenData.token_id,
        maker: tokenCreatorData[0].wallet,
        taker: accounts[0],
        price: endPrice,
        uri: tokenData.uri,
        erc20: tokenContractWETH,
        signature: tokenData.signature,
      },
    })

    const orderId = yield call(api, {
      url: APP_CONFIG.createOrder,
      method: 'POST',
      data: {
        maker: order[0].maker,
        makeAssetTypeClass: order[0].makeAsset.assetType.assetClass,
        makeAssetTypeData: order[0].makeAsset.assetType.data,
        makeAssetValue: order[0].makeAsset.value,
        taker: order[0].taker,
        takeAssetTypeClass: order[0].takeAsset.assetType.assetClass,
        takeAssetTypeData: order[0].takeAsset.assetType.data,
        takeAssetValue: order[0].takeAsset.value,
        start: order[0].start,
        end: order[0].end,
        salt: order[0].salt,
        dataType: order[0].dataType,
        data: order[0].data,
        signature: order[0].signatureOrder,
      },
    })

    const offerId: string = yield call(api, {
      url: APP_CONFIG.makeOffer,
      method: 'POST',
      data: {
        orderId: getIdFromString(orderId),
        itemId: tokenData.id,
        userId,
        bidAmount: endPrice,
      },
    })

    yield put(makeOfferSuccess({ offerId: getIdFromString(offerId) }))
  } catch (e) {
    yield put(makeOfferFailure(e.message || e))
  }
}
