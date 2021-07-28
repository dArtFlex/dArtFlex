import { PayloadAction } from '@reduxjs/toolkit'
import { IApi } from '../../services/types'
import { call, put, select } from 'redux-saga/effects'
import { buyNowFailure, buyNowSuccess } from 'stores/reducers/buyNow'
import { walletService } from 'services/wallet_service'
import { web3Service } from 'services/web3_service'
import { buyNowService } from 'services/buynow_service'
import { getIdFromString } from 'utils'
import APP_CONFIG from 'config'
import tokensAll from 'core/tokens'
import { UserDataTypes, IChainId, AssetTypes, IAssetMarketData, IOrderData } from 'types'

export function* buyNow(api: IApi, { payload: { amount } }: PayloadAction<{ amount: string }>) {
  try {
    const chainId: IChainId = walletService.getChainId()
    const web3 = web3Service.getWeb3()
    const tokenContractETH: string | undefined = tokensAll[chainId].find((t) => t.symbol === 'ETH')?.id
    const { tokenData, marketData }: { tokenData: AssetTypes; marketData: IAssetMarketData } = yield select(
      (state) => state.assets.assetDetails
    )
    const { id: userId }: { id: number } = yield select((state) => state.user.user)
    const accounts: string = walletService.getAccoutns()
    const endPrice: string = yield web3.utils.toWei(amount, 'ether')

    const tokenCreatorData: UserDataTypes[] = yield call(api, {
      url: APP_CONFIG.getUserProfileByUserId(Number(tokenData.creator)),
    })

    const order: IOrderData[] = yield buyNowService.generateOrder({
      body: {
        contract: tokenData.contract,
        tokenId: tokenData.token_id,
        maker: tokenCreatorData[0].wallet,
        taker: accounts[0],
        price: endPrice,
        uri: tokenData.uri,
        erc20: tokenContractETH,
        signature: tokenData.signature,
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

    yield call(api, {
      url: APP_CONFIG.buy,
      method: 'POST',
      data: {
        orderId: getIdFromString(orderId),
        itemId: tokenData.id,
        userId,
        marketId: Number(marketData.id),
        bidAmount: endPrice,
      },
    })

    yield put(buyNowSuccess({ buyItemId: marketData.id }))
  } catch (e) {
    yield put(buyNowFailure(e.message || e))
  }
}
