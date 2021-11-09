import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { history } from '../../navigation'
import routes from '../../routes'
import {
  listingSuccess,
  listingFailure,
  unlistingSuccess,
  unlistingFailure,
  changePriceSuccess,
  changePriceFailure,
} from 'stores/reducers/listing'
import { getUserAssetsRequest } from 'stores/reducers/user'
import { ListingStateType } from 'stores/reducers/listing/types'
import { MintingStateType } from 'stores/reducers/minting/types'
import { IOrderData } from 'types'
import { walletService } from 'services/wallet_service'
import { listingService } from 'services/listing_service'
import APP_CONFIG from 'config'
import { ZERO } from 'config/blockchain'
import { normalizeDate, getIdFromString } from 'utils'

export function* listing(api: IApi, { payload: { data } }: PayloadAction<{ data: ListingStateType['data'] }>) {
  try {
    const {
      data: { royalties },
      lazyMintData,
      lazyMintItemId,
      lazymint,
    }: Pick<MintingStateType, 'data' | 'lazyMintData' | 'lazyMintItemId' | 'lazymint'> = yield select(
      (state) => state.minting
    )

    const { id: userId }: { id: number } = yield select((state) => state.user.user)
    const accounts = walletService.getAccoutns()

    // Prices before converting must be as string
    const startPrice: string = yield window.web3.utils.toWei(String(data.startPrice), 'ether')
    const endPrice: string = yield window.web3.utils.toWei(data.endPrice ? String(data.endPrice) : '0', 'ether')

    const tokenContract = data.salesTokenContract

    const dateStartTime = data.start_time ? normalizeDate(data.start_time).getTime() : new Date().getTime()
    const dateEndTime = data.type === 'instant_buy' ? dateStartTime : normalizeDate(data.end_time).getTime()
    const royalty = lazyMintData?.royalties !== undefined ? lazyMintData.royalties : JSON.parse(royalties)

    const order: IOrderData[] = yield listingService.generateOrder({
      body: {
        contract: lazyMintData?.contract,
        tokenId: lazyMintData?.tokenId,
        maker: accounts[0],
        taker: ZERO,
        price: startPrice,
        uri: lazyMintData?.uri,
        erc20: tokenContract, // If the sales token is ETH or BNB or MATIC then erc20 should be '0x' otherwise, erc20 is the token id
        signature: lazyMintData?.signatures[0],
        lazymint,
        royalty,
      },
    })

    const marketId: string = yield call(api, {
      url: APP_CONFIG.createSalesDetail,
      method: 'POST',
      data: {
        itemId: lazyMintItemId,
        type: data.type,
        startPrice: startPrice,
        endPrice: data.type === 'instant_buy' ? '0' : endPrice, // endPrice must be 0 if data.type is "instant_buy"

        // startTime and endTime in instant_buy should be new Date().getTime
        startTime: dateStartTime,
        endTime: dateEndTime,
        salesTokenContract: tokenContract,
        platfromFee: data.platfromFee,
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

    const listItemId: string = yield call(api, {
      url: APP_CONFIG.bidListItem,
      method: 'POST',
      data: {
        itemId: lazyMintItemId,
        orderId: getIdFromString(orderId),
        userId,
        bidAmount: startPrice, // bidAmount is the same as startPrice
        marketId: getIdFromString(marketId),
        bidContract: tokenContract,
      },
    })

    yield put(
      listingSuccess({
        orderId: getIdFromString(orderId),
        salesDetailId: getIdFromString(marketId),
        listItemId: getIdFromString(listItemId),
        bidListItemId: getIdFromString(listItemId), // redundand part
      })
    )

    history.push(routes.createNFT)
  } catch (e) {
    yield put(listingFailure(e))
  }
}

export function* unlisting(api: IApi, { payload: { market_id } }: PayloadAction<{ market_id: string }>) {
  try {
    yield call(api, {
      method: 'POST',
      url: APP_CONFIG.bidUnlistingItem,
      data: {
        id: market_id,
      },
    })
    yield put(unlistingSuccess())

    yield put(getUserAssetsRequest())
  } catch (e) {
    const error = {
      code: 4001,
      message: 'Unlist Artwork was faild as NFT has been bidded.',
    }
    yield put(unlistingFailure(error))
  }
}

export function* changePrice(
  api: IApi,
  { payload: { itemId, newPrice } }: PayloadAction<{ itemId: string; newPrice: string }>
) {
  try {
    const price: string = yield window.web3.utils.toWei(newPrice, 'ether')
    yield call(api, {
      method: 'POST',
      url: APP_CONFIG.changePrice,
      data: {
        id: itemId,
        newPrice: price,
      },
    })
    yield put(changePriceSuccess())
  } catch (e) {
    yield put(changePriceFailure(e.message || e))
  }
}
