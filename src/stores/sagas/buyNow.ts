//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { buyNowFailure, buyNowSuccess } from 'stores/reducers/buyNow'
import { walletService } from 'services/wallet_service'
import { buyNowService } from 'services/buynow_service'
import APP_CONFIG from 'config'
import { AssetTypes, IAssetMarketData, IAcceptBidTransaction } from 'types'

export function* buyNow(
  api: IApi,
  { payload: { amount, order_id } }: PayloadAction<{ amount: string; order_id: string }>
) {
  try {
    const { tokenData, marketData }: { tokenData: AssetTypes; marketData: IAssetMarketData } = yield select(
      (state) => state.assets.assetDetails
    )
    const { id: userId }: { id: number } = yield select((state) => state.user.user)
    const accounts: string = walletService.getAccoutns()

    const creatorOrder = yield call(api, {
      url: APP_CONFIG.getOrderByOrderId(order_id),
    })

    const acceptBidTransaction: IAcceptBidTransaction = yield buyNowService.performMint(
      creatorOrder,
      accounts[0],
      `${+amount + +amount * 0.05}` // need to add 5% to amount
    )

    yield call(api, {
      url: APP_CONFIG.buy,
      method: 'POST',
      data: {
        orderId: '0',
        itemId: tokenData.id,
        userId,
        marketId: Number(marketData.id),
        bidAmount: amount,
        txHash: acceptBidTransaction.transactionHash,
      },
    })

    yield put(buyNowSuccess({ buyItemId: marketData.id, transactionHash: acceptBidTransaction.transactionHash }))
  } catch (e) {
    yield put(buyNowFailure({ message: e, transactionHash: e.receipt.transactionHash }))
  }
}
