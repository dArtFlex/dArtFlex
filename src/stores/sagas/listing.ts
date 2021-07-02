//@ts-nocheck
import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { history } from '../../navigation'
import routes from '../../routes'
import { listingSuccess, listingFailure } from 'stores/reducers/listing'
import { ListingStateType } from 'stores/reducers/listing/types'
import { walletService } from 'services/wallet_service'
import { listingService } from 'services/listing_service'
import APP_CONFIG from 'config'

function getIdFromString(v) {
  return +v.match(/\d/g).join('')
}

export function* listing(api: IApi, { payload: { data } }: PayloadAction<{ data: ListingStateType['data'] }>) {
  try {
    const { lazyMintData, lazyMintItemId }: ReturnType<typeof selector> = yield select((state) => state.minting)
    const accounts = walletService.getAccoutns()

    const startPrice = yield web3.utils.toWei(data.startPrice, 'ether')
    const endPrice = yield web3.utils.toWei(data.endPrice, 'ether')

    const WETH_Contract_Rinkeby = '0xdf032bc4b9dc2782bb09352007d4c57b75160b15'

    // const dateEndTime = data.end_time.getTime()
    const dateEndTime = new Date().getTime() + 1000 * 60 * 60

    const dateStartTime = data.start_time === '0' ? new Date().getTime() : data.start_time

    const marketId = yield call(api, {
      url: APP_CONFIG.createSalesDetail,
      method: 'POST',
      data: {
        itemId: lazyMintItemId,
        type: data.type,
        startPrice: startPrice,
        endPrice: data.type === 'instant_buy' ? '0' : endPrice,
        // it's Reserve Price
        // endPrice must be 0 if data.type is "instant_buy"

        // Todo: startTime and endTime in instant_buy should be new Date().getTime
        startTime: data.type === 'instant_buy' ? dateStartTime : new Date().getTime(),
        endTime: data.type === 'instant_buy' ? dateStartTime : dateEndTime,
        // should be 0 if data.type is "instant_buy"
        salesTokenContract: data.type === 'instant_buy' ? '0x' : WETH_Contract_Rinkeby,
        // for ETH don't have addresse that's why use 0x
        // token contract address ETH, DAF etc.
        platfromFee: data.platfromFee,
      },
    })

    const order = yield listingService.generateOrder({
      body: {
        contract: lazyMintData.contract,
        tokenId: lazyMintData.tokenId,
        // todo: check lm.maker, it should be address from lazyMintData.maker
        maker: accounts[0],
        taker: '0x0000000000000000000000000000000000000000',
        price: startPrice,
        uri: lazyMintData.uri,
        // erc20 - 0x only ETH
        erc20: '0x',
        signature: lazyMintData.signatures[0],
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

    const listItemId = yield call(api, {
      url: APP_CONFIG.bidListItem,
      method: 'POST',
      data: {
        itemId: lazyMintItemId,
        orderId: getIdFromString(orderId),
        userId: 1,
        bidAmount: startPrice,
        // bidAmount the same with startPrice
        marketId: getIdFromString(marketId),
        bidContract: data.type === 'instant_buy' ? '0x' : WETH_Contract_Rinkeby,
        // Sells token contract
        // for ETH don't have addresse that's why use 0x
        // token contract address ETH, DAF etc.
      },
    })

    // Push bid to list item with bids
    const bidListItemId = yield call(api, {
      url: 'http://dartflex-dev.ml:8888/api/bid/list_item',
      method: 'POST',
      data: {
        itemId: lazyMintItemId,
        orderId: getIdFromString(orderId),
        // userId should be get from /api/user/get/wallet/{wallet}
        userId: 1,
        bidAmount: startPrice,
        marketId: getIdFromString(marketId),
        // 0x only ETH
        bidContract: data.type === 'instant_buy' ? '0x' : WETH_Contract_Rinkeby,
      },
    })

    yield put(
      listingSuccess({
        orderId: getIdFromString(orderId),
        salesDetailId: getIdFromString(marketId),
        listItemId: getIdFromString(listItemId),
        bidListItemId: getIdFromString(bidListItemId),
      })
    )

    history.push(routes.createNFT)
  } catch (e) {
    yield put(listingFailure(e))
  }
}
