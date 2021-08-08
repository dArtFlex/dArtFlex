//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select, all } from 'redux-saga/effects'
import {
  placeBidSuccess,
  placeBidFailure,
  getBidsHistoryFailure,
  getBidsHistorySuccess,
  acceptBidSuccess,
  acceptBidFailure,
  getBidsSuccess,
  getBidsFailure,
  cancelBidSuccess,
  cancelBidFailure,
} from 'stores/reducers/placeBid'
import { getUserDataById } from 'stores/sagas/user'
import { walletService } from 'services/wallet_service'
import { placeBidService } from 'services/placebid_service'
import { acceptBidService } from 'services/accept_bid_service'
import APP_CONFIG from 'config'
import { getIdFromString } from 'utils'
import tokensAll from 'core/tokens'
import { UserDataTypes, IAcceptBidTransaction, IBids } from 'types'

export function* placeBid(api: IApi, { payload: { bidAmount } }: PayloadAction<{ bidAmount: string }>) {
  try {
    const chainId: IChainId = walletService.getChainId()
    const tokenContractWETH = tokensAll[chainId].find((t) => t.symbol === 'WETH').id
    const { tokenData, marketData }: ReturnType<typeof selector> = yield select((state) => state.assets.assetDetails)
    const { id: userId }: ReturnType<typeof selector> = yield select((state) => state.user.user)
    const accounts = walletService.getAccoutns()
    const endPrice = yield web3.utils.toWei(bidAmount, 'ether')

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

    const placeBidId = yield call(api, {
      url: APP_CONFIG.placeBid,
      method: 'POST',
      data: {
        orderId: getIdFromString(orderId),
        itemId: tokenData.id,
        userId,
        marketId: Number(marketData.id),
        bidAmount: endPrice,
      },
    })

    yield put(placeBidSuccess({ data: { placeBidId: getIdFromString(placeBidId) } }))
  } catch (e) {
    yield put(placeBidFailure(e.message || e))
  }
}

export function* getBidsHistory(api: IApi) {
  try {
    const { marketData }: ReturnType<typeof selector> = yield select((state) => state.assets.assetDetails)
    const getHistory = yield call(api, {
      url: APP_CONFIG.getHistoryNFT(+marketData.item_id),
    })

    const userData: UserDataTypes[] = yield all(
      getHistory.map((h) => {
        const userDataId = h.from !== '0' ? h.from : h.to
        return call(getUserDataById, api, userDataId)
      })
    )
    const composeData = getHistory.flatMap((h, i) => ({ ...h, userData: userData[i] }))

    yield put(getBidsHistorySuccess(composeData))
  } catch (e) {
    yield put(getBidsHistoryFailure(e))
  }
}

export function* acceptBid(
  api: IApi,
  { payload }: PayloadAction<{ creatorId: string; buyerId: string; market_id: string; bid_id: string }>
) {
  try {
    const marketData = yield call(api, {
      url: APP_CONFIG.getHistory(payload.market_id),
    })
    const creatorOrder = yield call(api, {
      url: APP_CONFIG.getOrderByOrderId(marketData[0].order_id),
    })
    const buyerOrder = yield call(api, {
      url: APP_CONFIG.getOrderByOrderId(marketData[marketData.length - 1].order_id),
    })

    const acceptBidTransaction: IAcceptBidTransaction = yield acceptBidService.performMint(creatorOrder, buyerOrder)

    yield call(api, {
      url: APP_CONFIG.acceptBid,
      method: 'POST',
      data: {
        id: payload.bid_id,
        txHash: acceptBidTransaction.transactionHash,
      },
    })

    yield put(acceptBidSuccess({ acceptBidTransaction }))
  } catch (e) {
    yield put(acceptBidFailure(e.message || e))
  }
}

export function* getBids(api: IApi, { payload }: PayloadAction<{ market_id: string }>) {
  try {
    const getHistory: IBids[] = yield call(api, {
      url: APP_CONFIG.getHistory(payload.market_id),
    })
    const userData: UserDataTypes[] = yield all(getHistory.map((h) => call(getUserDataById, api, h.user_id)))
    const bids = getHistory.flatMap((h, i) => ({ ...h, userData: userData[i] }))
    yield put(getBidsSuccess({ bids }))
  } catch (e) {
    yield put(getBidsFailure(e.message || e))
  }
}

export function* cancelBid(api: IApi, { payload }: PayloadAction<{ bid_id: string }>) {
  try {
    yield call(api, {
      url: APP_CONFIG.cancelBid,
      method: 'POST',
      data: {
        id: payload.bid_id,
      },
    })
    yield put(cancelBidSuccess())
  } catch (e) {
    yield put(cancelBidFailure(e.message || e))
  }
}
