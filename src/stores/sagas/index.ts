import { takeLatest, all, debounce } from 'redux-saga/effects'
import apiMiddleware from '../../services/api_middleware'
import { getUserDataRequest } from '../reducers/user'
import { getAssetsRequest } from '../reducers/assets'
import { connectMetaMaskRequest } from '../reducers/wallet'
import { createBidRequest } from '../reducers/auction'
import { getUserData } from '../sagas/user'
import { getAssetsData } from '../sagas/assets'
import { connectMetaMask } from '../sagas/wallet'
import { createBid } from '../sagas/auction'

export default function* root() {
  yield all([
    /** User **/
    takeLatest(getUserDataRequest.type, getUserData, apiMiddleware),
    takeLatest(getAssetsRequest.type, getAssetsData, apiMiddleware),
    /** Wallet **/
    takeLatest(connectMetaMaskRequest.type, connectMetaMask, apiMiddleware),
    /** Auction **/
    debounce(500, createBidRequest.type, createBid, apiMiddleware),
  ])
}
