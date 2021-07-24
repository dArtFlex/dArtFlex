//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select, all } from 'redux-saga/effects'
import {
  placeBidSuccess,
  placeBidFailure,
  getBidsHistoryFailure,
  getBidsHistorySuccess,
} from 'stores/reducers/placeBid'
import { getUserDataById } from 'stores/sagas/user'
// import { PlaceBidStateType } from 'stores/reducers/placeBid/types'
import { walletService } from 'services/wallet_service'
import { placeBidService } from 'services/placebid_service'
import { acceptBidService } from 'services/accept_bid_service'
import APP_CONFIG from 'config'
import { getIdFromString } from 'utils'
import tokensAll from 'core/tokens'

// const WETH_Contract_Rinkeby = '0xdf032bc4b9dc2782bb09352007d4c57b75160b15'

export function* placeBid(api: IApi, { payload: { bidAmount } }: PayloadAction<{ bidAmount: string }>) {
  try {
    const chainId: IChainId = walletService.getChainId()
    const tokenContractWETH = tokensAll[chainId].find((t) => t.symbol === 'WETH').id
    const { tokenData, marketData }: ReturnType<typeof selector> = yield select((state) => state.assets.assetDetails)
    const { id: userId }: ReturnType<typeof selector> = yield select((state) => state.user.user)
    const accounts = walletService.getAccoutns()
    const endPrice = yield web3.utils.toWei(bidAmount, 'ether')

    const order = yield placeBidService.generateOrder({
      body: {
        contract: tokenData.contract,
        tokenId: tokenData.token_id,
        maker: accounts[0],
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

    const userData: UserDataTypes[] = yield all(getHistory.map((h) => call(getUserDataById, api, h.from)))
    const composeData = getHistory.flatMap((h, i) => ({ ...h, userData: userData[i] }))

    yield put(getBidsHistorySuccess(composeData))
  } catch (e) {
    yield put(getBidsHistoryFailure(e))
  }
}

export function* acceptBid(
  api: IApi,
  { payload }: PayloadAction<{ creatorId: string; buyerId: string; market_id: string }>
) {
  try {
    const marketData = yield call(api, {
      url: 'https://dartflex-dev.ml:8887/api/bid/get_by_market/' + payload.market_id,
    })

    const creatorOrder = yield call(api, {
      url: APP_CONFIG.getOrderByOrderId(marketData[0].order_id),
    })
    const buyerOrder = yield call(api, {
      url: APP_CONFIG.getOrderByOrderId(marketData[1].order_id), // should be the last element of array
    })

    yield acceptBidService.performMint(creatorOrder, buyerOrder)

    yield call(api, {
      url: APP_CONFIG.acceptBid,
      method: 'POST',
      data: {
        id: payload.buyerId,
      },
    })
  } catch (e) {
    throw new Error(e.message || e)
  }
}
