import { takeLatest, all } from 'redux-saga/effects'
import apiMiddleware from '../../services/api_middleware'
import { getUserDataRequest, createNewUserRequest } from '../reducers/user'
import { getAssetsRequest } from '../reducers/assets'
import { connectMetaMaskRequest, connnectWalletConnectRequest } from '../reducers/wallet'

import { lazyMintingRequest, uploadImageRequest } from '../reducers/minting'
import { listingRequest } from '../reducers/listing'
import { getUserData, createNewUser } from '../sagas/user'
import { getAssetsData } from '../sagas/assets'
import { connectMetaMask, connectWalletConnect } from '../sagas/wallet'

import { minting, uploadImage } from '../sagas/minting'
import { listing } from '../sagas/listing'

export default function* root() {
  yield all([
    /** User **/
    takeLatest(getUserDataRequest.type, getUserData, apiMiddleware),
    takeLatest(getAssetsRequest.type, getAssetsData, apiMiddleware),
    takeLatest(createNewUserRequest.type, createNewUser, apiMiddleware),
    /** Wallet **/
    takeLatest(connectMetaMaskRequest.type, connectMetaMask, apiMiddleware),
    takeLatest(connnectWalletConnectRequest.type, connectWalletConnect, apiMiddleware),
    /** Minting **/
    takeLatest(lazyMintingRequest.type, minting, apiMiddleware),
    takeLatest(uploadImageRequest.type, uploadImage, apiMiddleware),
    /** Listing **/
    takeLatest(listingRequest.type, listing, apiMiddleware),
  ])
}
