import { takeLatest, all } from 'redux-saga/effects'
import apiMiddleware from '../../services/api_middleware'

import {
  getUserDataRequest,
  createNewUserRequest,
  getUserAssetsRequest,
  getUserBidsRequest,
  getPromotionRequest,
  addPromotionRequest,
  deletePromotionRequest,
  getAllUsersRequest,
  getTradingHistoryRequest,
} from '../reducers/user'
import { getAssetsAllRequest, getAssetByIdRequest, getExchangeRateTokensRequest } from '../reducers/assets'
import {
  connectMetaMaskRequest,
  connnectWalletConnectRequest,
  getTokensBalancesRequest,
  walletsDisconetRequest,
} from '../reducers/wallet'
import { lazyMintingRequest, uploadImageRequest } from '../reducers/minting'
import { listingRequest } from '../reducers/listing'
import { placeBidRequest, getBidsHistoryRequest, acceptBidRequest } from '../reducers/placeBid'
import { buyNowRequest } from '../reducers/buyNow'

import {
  getUserData,
  createNewUser,
  getUserAssets,
  getUserBids,
  getPromotion,
  addPromotion,
  deletePromotion,
  getAllUsers,
  tradingHistory,
} from '../sagas/user'
import { getAssetsAllData, getAssetById, getExchangeRateTokens } from '../sagas/assets'
import { connectMetaMask, connectWalletConnect, getTokensBalances, walletsDisconet } from '../sagas/wallet'
import { minting, uploadImage } from '../sagas/minting'
import { listing } from '../sagas/listing'
import { placeBid, getBidsHistory, acceptBid } from '../sagas/placeBid'
import { buyNow } from '../sagas/buyNow'

export default function* root() {
  yield all([
    /** Assets **/
    takeLatest(getAssetsAllRequest.type, getAssetsAllData, apiMiddleware),
    takeLatest(getAssetByIdRequest.type, getAssetById, apiMiddleware),
    takeLatest(getExchangeRateTokensRequest.type, getExchangeRateTokens, apiMiddleware),

    /** User **/
    takeLatest(getUserDataRequest.type, getUserData, apiMiddleware),
    takeLatest(createNewUserRequest.type, createNewUser, apiMiddleware),
    takeLatest(getUserAssetsRequest.type, getUserAssets, apiMiddleware),
    takeLatest(getUserBidsRequest.type, getUserBids, apiMiddleware),
    takeLatest(getPromotionRequest.type, getPromotion, apiMiddleware),
    takeLatest(addPromotionRequest.type, addPromotion, apiMiddleware),
    takeLatest(deletePromotionRequest.type, deletePromotion, apiMiddleware),
    takeLatest(getAllUsersRequest.type, getAllUsers, apiMiddleware),
    takeLatest(getTradingHistoryRequest.type, tradingHistory, apiMiddleware),

    /** Wallet **/
    takeLatest(connectMetaMaskRequest.type, connectMetaMask, apiMiddleware),
    takeLatest(connnectWalletConnectRequest.type, connectWalletConnect, apiMiddleware),
    takeLatest(getTokensBalancesRequest.type, getTokensBalances, apiMiddleware),
    takeLatest(walletsDisconetRequest, walletsDisconet),

    /** Minting **/
    takeLatest(lazyMintingRequest.type, minting, apiMiddleware),
    takeLatest(uploadImageRequest.type, uploadImage, apiMiddleware),

    /** Listing **/
    takeLatest(listingRequest.type, listing, apiMiddleware),

    /** Place Bid **/
    takeLatest(placeBidRequest.type, placeBid, apiMiddleware),
    takeLatest(getBidsHistoryRequest.type, getBidsHistory, apiMiddleware),
    takeLatest(acceptBidRequest.type, acceptBid, apiMiddleware),

    /** Buy Now **/
    takeLatest(buyNowRequest.type, buyNow, apiMiddleware),
  ])
}
