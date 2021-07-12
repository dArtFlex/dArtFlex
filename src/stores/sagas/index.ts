import { takeLatest, all } from 'redux-saga/effects'
import apiMiddleware from '../../services/api_middleware'

import { getUserDataRequest, createNewUserRequest, getUserBalancesRequest } from '../reducers/user'
import { getAssetsAllRequest, getAssetByIdRequest, getExchangeRateTokensRequest } from '../reducers/assets'
import { connectMetaMaskRequest, connnectWalletConnectRequest } from '../reducers/wallet'
import { lazyMintingRequest, uploadImageRequest } from '../reducers/minting'
import { listingRequest } from '../reducers/listing'
import { placeBidRequest } from '../reducers/placeBid'

import { getUserData, createNewUser, getUserBalances } from '../sagas/user'
import { getAssetsAllData, getAssetById, getExchangeRateTokens } from '../sagas/assets'
import { connectMetaMask, connectWalletConnect } from '../sagas/wallet'
import { minting, uploadImage } from '../sagas/minting'
import { listing } from '../sagas/listing'
import { placeBid } from '../sagas/placeBid'

export default function* root() {
  yield all([
    /** Assets **/
    takeLatest(getAssetsAllRequest.type, getAssetsAllData, apiMiddleware),
    takeLatest(getAssetByIdRequest.type, getAssetById, apiMiddleware),
    takeLatest(getExchangeRateTokensRequest.type, getExchangeRateTokens, apiMiddleware),
    /** User **/
    takeLatest(getUserDataRequest.type, getUserData, apiMiddleware),
    takeLatest(createNewUserRequest.type, createNewUser, apiMiddleware),
    takeLatest(getUserBalancesRequest.type, getUserBalances, apiMiddleware),
    /** Wallet **/
    takeLatest(connectMetaMaskRequest.type, connectMetaMask, apiMiddleware),
    takeLatest(connnectWalletConnectRequest.type, connectWalletConnect, apiMiddleware),
    /** Minting **/
    takeLatest(lazyMintingRequest.type, minting, apiMiddleware),
    takeLatest(uploadImageRequest.type, uploadImage, apiMiddleware),
    /** Listing **/
    takeLatest(listingRequest.type, listing, apiMiddleware),
    /** Place Bid **/
    takeLatest(placeBidRequest.type, placeBid, apiMiddleware),
  ])
}
