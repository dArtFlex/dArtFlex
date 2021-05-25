//@ts-nocheck
// import Web3 from 'web3'
// import detectEthereumProvider from '@metamask/detect-provider'
import { put } from '@redux-saga/core/effects'
import { OpenSeaPort, Network } from 'opensea-js'
import Web3ProviderEngine from 'web3-provider-engine'
import { walletService } from 'services/wallet_service'
import { IApi } from '../../services/types'
import { createBidSuccess, createBidFailure } from 'stores/reducers/auction'
import { NFT_CONTRACT_ADDRESS } from 'core'

export function* createBid(api: IApi, { payload: { tokenId } }: PayloadAction<{ tokenId: string }>) {
  try {
    yield put(createBidSuccess(tokenId))
  } catch (e) {
    yield put(createBidFailure(e))
  }
}

export function* createSellOrder(api: IApi, { payload: { tokenId } }: PayloadAction<{ tokenId: string }>) {
  try {
    const providerEngine = new Web3ProviderEngine()

    // const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
    // Network.Rinkeby for test
    const seaport = new OpenSeaPort(providerEngine, {
      networkName: Network.Rinkeby,
    })

    const startAmount = 0 // The minimum amount to sell for, in normal units (e.g. ETH)
    const expirationTime = Math.round(Date.now() + (1000 + 60 * 60 * 24))
    const OWNER_ASSET_ADDRESS = yield walletService.getMetaMaskAccount()
    const paymentTokenAddress = '0xc778417e063141139fce010982780140aa0cd5ab'

    yield seaport.createSellOrder({
      asset: {
        tokenAddress: NFT_CONTRACT_ADDRESS,
        tokenId,
      },
      accountAddress: OWNER_ASSET_ADDRESS[0],
      startAmount,
      expirationTime,
      paymentTokenAddress,
      waitForHighestBid: true,
    })

    console.log('createSellOrderSuccess')
  } catch (e) {
    console.log('createSellOrderFailure', e)
  }
}
