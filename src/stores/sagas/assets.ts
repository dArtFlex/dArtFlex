//@ts-nocheck
import { put, delay } from 'redux-saga/effects'
import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { bc } from 'services/blockchain_service'
import { OpenSeaPort, Network } from 'opensea-js'
import { getAssetsSuccess, getAssetsFailure } from 'stores/reducers/assets'
import { IApi } from '../../services/types'

import { TOKEN_ADDRESS } from 'core'

export function* getAssetsData(api: IApi) {
  try {
    const contract = bc.newContract()

    const web3Provider = web3Service.getWeb3Provider()
    // Network.Rinkeby for test
    const seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Rinkeby,
    })

    const assets = []
    let i = 0
    while (i < 10) {
      const tokenId = yield bc.getTokenId(i)

      const asset: OpenSeaAsset = yield seaport.api.getAsset({
        tokenAddress: TOKEN_ADDRESS,
        tokenId,
      })
      yield delay(500)

      const startAmount = 0 // The minimum amount to sell for, in normal units (e.g. ETH)
      const expirationTime = Math.round(Date.now() + (1000 + 60 * 60 * 24))
      const walletAddress = yield walletService.getMetaMaskAccount()
      const paymentTokenAddress = '0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15'

      // const auction = yield seaport.createSellOrder({
      //   asset: {
      //     tokenId,
      //     tokenAddress: asset.tokenAddress,
      //   },
      //   accountAddress: asset.owner.address,
      //   startAmount,
      //   expirationTime,
      //   paymentTokenAddress,
      //   waitForHighestBid: true,
      // })

      assets.push({
        name: asset.name,
        image: asset.imageUrl,
        tokenId,
        description: asset.description,
        ...asset,
      })
      i++
    }

    yield put(getAssetsSuccess(assets))
  } catch (e) {
    yield put(getAssetsFailure(e.message || e))
  }
}
