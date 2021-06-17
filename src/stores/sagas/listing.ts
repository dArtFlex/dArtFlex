//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { history } from '../../navigation'
import routes from '../../routes'
import { listingSuccess, listingFailure } from 'stores/reducers/listing'
import { ListingStateType } from 'stores/reducers/listing/types'
import { walletService } from 'services/wallet_service'
import { orderService } from 'services/order_service'
import APP_CONFIG from 'config'

function getIdFromString(v) {
  return +v.match(/\d/g).join('')
}

export function* listing(api: IApi, { payload: { data } }: PayloadAction<{ data: ListingStateType['data'] }>) {
  try {
    const { lazyMintData, lazyMintItemId }: ReturnType<typeof selector> = yield select((state) => state.minting)
    const accounts = walletService.getAccoutns()

    const salesDetailId = yield call(api, {
      url: APP_CONFIG.createSalesDetail,
      method: 'POST',
      data: {
        type: data.type,
        startPrice: data.startPrice,
        endPrice: data.type === 'instant_buy' ? '0' : data.endPrice,
        // it's Reserve Price
        // endPrice must be 0 if data.type is "instant_buy"
        startTime: data.startTime,
        endTime: data.type === 'instant_buy' ? '0' : data.endTime,
        // should be 0 if data.type is "instant_buy"
        salesTokenContract: '0x',
        // for ETH don't have addresse that's why use 0x
        // token contract address ETH, DAF etc.
        platfromFee: data.platfromFee,
      },
    })

    const order = yield orderService.generateOrder({
      body: {
        contract: lazyMintData.lazyMintContract,
        tokenId: lazyMintData.lazyMintTokenId,
        // todo: check lm.maker, it should be address from lazyMintData.maker
        maker: accounts[0],
        taker: '0x0000000000000000000000000000000000000000',
        price: '100000000000000000',
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
        signature: order[0].signature,
      },
    })

    const listItemId = yield call(api, {
      url: APP_CONFIG.bidListItem,
      method: 'POST',
      data: {
        itemId: lazyMintItemId,
        orderId: getIdFromString(orderId),
        userId: 1,
        bidAmount: data.startPrice,
        // bidAmount the same with startPrice
        salesDetailId: getIdFromString(salesDetailId),
        bidContract: '0x',
        // Sells token contract
        // for ETH don't have addresse that's why use 0x
        // token contract address ETH, DAF etc.
      },
    })

    yield put(
      listingSuccess({
        orderId: getIdFromString(orderId),
        salesDetailId: getIdFromString(salesDetailId),
        listItemId: getIdFromString(listItemId),
      })
    )

    history.push(routes.createNFT)
  } catch (e) {
    yield put(listingFailure(e))
  }
}
