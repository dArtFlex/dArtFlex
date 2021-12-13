import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { buyNowFailure, buyNowSuccess } from 'stores/reducers/buyNow'
import { walletService } from 'services/wallet_service'
import { buyNowService } from 'services/buynow_service'
import APP_CONFIG from 'config'
import { IAssetMarketData, IAcceptBidTransaction, IOrderData } from 'types'

export function* buyNow(
  api: IApi,
  { payload: { amount, order_id } }: PayloadAction<{ amount: string; order_id: string }>
) {
  try {
    const { marketData }: { marketData: IAssetMarketData } = yield select((state) => state.assets.assetDetails)
    const accounts: string[] = walletService.getAccoutns()

    const creatorOrder: IOrderData = yield call(api, {
      url: APP_CONFIG.getOrderByOrderId(order_id),
    })

    const acceptBidTransaction: IAcceptBidTransaction = yield buyNowService.performMint(
      creatorOrder,
      accounts[0],
      `${+amount}`
    )

    yield put(buyNowSuccess({ buyItemId: marketData.id, transactionHash: acceptBidTransaction.transactionHash }))
  } catch (e) {
    yield put(buyNowFailure({ message: e }))
  }
}
