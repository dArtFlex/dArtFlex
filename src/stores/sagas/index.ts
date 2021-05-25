import { takeLatest, all, debounce } from 'redux-saga/effects'
import apiMiddleware from '../../services/api_middleware'
import { getUserDataRequest, createNewUserRequest } from '../reducers/user'
import { getAssetsRequest } from '../reducers/assets'
import { connectMetaMaskRequest, connnectTrustRequest } from '../reducers/wallet'
import { createBidRequest } from '../reducers/auction'
import { mintingRequest, loadImageRequest } from '../reducers/minting'
import { getUserData, createNewUser } from '../sagas/user'
import { getAssetsData } from '../sagas/assets'
import { connectMetaMask, connectTrust } from '../sagas/wallet'
import { createBid } from '../sagas/auction'
import { minting, loadImage } from '../sagas/minting'

export default function* root() {
  yield all([
    /** User **/
    takeLatest(getUserDataRequest.type, getUserData, apiMiddleware),
    takeLatest(getAssetsRequest.type, getAssetsData, apiMiddleware),
    takeLatest(createNewUserRequest.type, createNewUser, apiMiddleware),
    /** Wallet **/
    takeLatest(connectMetaMaskRequest.type, connectMetaMask, apiMiddleware),
    takeLatest(connnectTrustRequest.type, connectTrust, apiMiddleware),
    /** Auction **/
    debounce(500, createBidRequest.type, createBid, apiMiddleware),
    /** Minting **/
    takeLatest(mintingRequest.type, minting, apiMiddleware),
    takeLatest(loadImageRequest.type, loadImage, apiMiddleware),
  ])
}
