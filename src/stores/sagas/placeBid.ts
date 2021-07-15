//@ts-nocheck
// import { PayloadAction } from '@reduxjs/toolkit'
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
import APP_CONFIG from 'config'
import { getIdFromString } from 'utils'

const WETH_Contract_Rinkeby = '0xdf032bc4b9dc2782bb09352007d4c57b75160b15'

export function* placeBid(api: IApi) {
  try {
    const { tokenData, marketData }: ReturnType<typeof selector> = yield select((state) => state.assets.assetDetails)
    const { id: userId }: ReturnType<typeof selector> = yield select((state) => state.user.user)
    const accounts = walletService.getAccoutns()
    const endPrice = yield web3.utils.toWei(bidAmount, 'ether')

    const order = yield placeBidService.generateOrder({
      body: {
        contract: tokenData.contract,
        tokenId: marketData.id,
        maker: tokenData.owner,
        taker: accounts[0],
        price: endPrice,
        uri: tokenData.uri,
        erc20: WETH_Contract_Rinkeby,
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
        itemId: marketData.id,
        userId,
        marketId: Number(marketData.id),
        bidAmount: endPrice,
      },
    })

    yield call(acceptBid)

    yield put(placeBidSuccess({ data: { placeBidId: getIdFromString(placeBidId) } }))
  } catch (e) {
    yield put(placeBidFailure(e))
  }
}

export function* getBidsHistory(api: IApi) {
  try {
    const { marketData }: ReturnType<typeof selector> = yield select((state) => state.assets.assetDetails)
    const getHistory = yield call(api, {
      url: APP_CONFIG.getHistory(+marketData.id),
    })
    const userData: UserDataTypes[] = yield all(getHistory.map((h) => call(getUserDataById, api, h.user_id)))
    const composeData = getHistory.flatMap((h, i) => ({ ...h, userData: userData[i] }))

    yield put(getBidsHistorySuccess(composeData))
  } catch (e) {
    yield put(getBidsHistoryFailure(e))
  }
}

export function* acceptBid(api: IApi) {
  try {
    const { marketData }: ReturnType<typeof selector> = yield select((state) => state.assets.assetDetails)

    yield call(api, {
      url: APP_CONFIG.acceptBid,
      method: 'POST',
      data: {
        id: marketData.id,
      },
    })
  } catch (e) {
    console.log(e)
  }
}
