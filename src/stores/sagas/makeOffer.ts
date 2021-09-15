import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import {
  makeOfferSuccess,
  makeOfferFailure,
  cancelOfferFailure,
  cancelOfferSuccess,
  acceptOfferSuccess,
  acceptOfferFailure,
} from 'stores/reducers/makeOffer'
import { walletService } from 'services/wallet_service'
import { placeBidService } from 'services/placebid_service'
import APP_CONFIG from 'config'
import { getIdFromString, networkConvertor } from 'utils'
import tokensAll from 'core/tokens'
import { UserDataTypes, IChainId, IBaseTokens, AssetTypes, IOrderData, IAcceptBidTransaction } from 'types'
import { acceptBidService } from 'services/accept_bid_service'

export function* makeOffer(api: IApi, { payload: { amount } }: PayloadAction<{ amount: string }>) {
  try {
    const getChainId: IChainId = walletService.getChainId()
    const chainId: IChainId = networkConvertor(getChainId)
    const tokenContractWETH = (tokensAll[chainId].find((t) => t.symbol === 'WETH') as IBaseTokens).id
    const { tokenData }: { tokenData: AssetTypes } = yield select((state) => state.assets.assetDetails)
    const { id: userId }: { id: number } = yield select((state) => state.user.user)
    const accounts: string[] = walletService.getAccoutns()
    const endPrice: string = yield window.web3.utils.toWei(amount, 'ether') // offer amounnt

    const allowance: boolean = yield placeBidService.checkAllowance(accounts[0], tokenContractWETH)
    if (!allowance) {
      // Should only be once, so we need to check if it's approved
      yield placeBidService.approveToken(accounts[0])
    }

    const lazymint = tokenData.lazymint

    const tokenCreatorData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(Number(tokenData.creator)),
    })

    const order: IOrderData[] = yield placeBidService.generateOrder({
      body: {
        contract: tokenData.contract,
        tokenId: tokenData.token_id,
        maker: tokenCreatorData[0].wallet,
        taker: accounts[0],
        price: endPrice,
        uri: tokenData.uri,
        erc20: tokenContractWETH,
        signature: tokenData.signature,
        lazymint,
      },
    })

    const orderId: string = yield call(api, {
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

    yield put(makeOfferSuccess({ offerId: getIdFromString(offerId) as number }))
  } catch (e) {
    yield put(makeOfferFailure(e))
  }
}

export function* cancelOffer(api: IApi, { payload }: PayloadAction<{ id: number }>) {
  try {
    const res: string = yield call(api, {
      url: APP_CONFIG.cancelOffer,
      method: 'POST',
      data: payload,
    })
    yield put(cancelOfferSuccess(res))
  } catch (e) {
    yield put(cancelOfferFailure(e))
  }
}

export function* acceptOffer(
  api: IApi,
  {
    payload,
  }: PayloadAction<{
    buyerId: string
    bid_id: string
    assetOwnerId: string
  }>
) {
  try {
    const buyerOrder: IOrderData = yield call(api, {
      url: APP_CONFIG.getOrderByOrderId(payload.buyerId),
    })

    const acceptOfferTransaction: IAcceptBidTransaction = yield acceptBidService.performMint(buyerOrder)

    yield call(api, {
      url: APP_CONFIG.acceptOffer,
      method: 'POST',
      data: {
        id: payload.bid_id,
        sellerId: Number(payload.assetOwnerId), // SellerId is the user id who list the NFT to the marketplace
        txHash: acceptOfferTransaction.transactionHash,
      },
    })

    yield put(acceptOfferSuccess({ acceptOfferTransaction }))
  } catch (e) {
    yield put(acceptOfferFailure(e))
  }
}
