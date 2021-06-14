//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { listingSuccess, listingFailure } from 'stores/reducers/listing'
import { ListingStateType } from 'stores/reducers/listing/types'
import { lazyMintService } from 'services/lazymint_service'
import { walletService } from 'services/wallet_service'
import { orderService } from 'services/order_service'

export function* listing(api: IApi) {
  try {
    debugger
    const salesDetailId = yield call(api, {
      url: 'http://dartflex-dev.ml:8888/api/sales_detail/create',
      method: 'POST',
      data: {
        type: 'instant_buy',
        startPrice: '1',
        endPrice: '0', //it's Reserve Price
        // endPrice must be 0
        startTime: `${new Date().getTime()}`,
        endTime: `0`,
        // should be 0
        salesTokenContract: '0x',
        // for ETH don't have addresse that's why use 0x
        // token contract address ETH, DAF etc.
        platfromFee: '2.5',
      },
    })

    const order = yield orderService.generateOrder({
      body: {
        contract: lazyMintContract,
        tokenId: lazyMintTokenId,
        // todo: check lm.maker
        maker: '0x5c763f9C2111a61e154d0A05a526E332c12957CE',
        taker: '0x0000000000000000000000000000000000000000',
        price: '100000000000000000',
      },
    })

    const orderId = yield call(api, {
      url: 'http://dartflex-dev.ml:8888/api/order/create',
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
        signature: order[0].signature,
      },
    })

    // Should

    const listItem = yield call(api, {
      url: 'http://dartflex-dev.ml:8888/api/bid/list_item',
      method: 'POST',
      data: {
        itemId: lazyMintItemId,
        orderId: getIdFromString(orderId),
        userId: 1,
        bidAmount: '1',
        // bidAmount the same with startPrice
        salesDetailId: getIdFromString(salesDetailId),
        bidContract: '0x',
        // Sells token contract
      },
    })

    yield put(listingSuccess())
  } catch (e) {
    yield put(listingFailure(e))
  }
}
