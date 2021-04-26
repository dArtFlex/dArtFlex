//@ts-nocheck
import Web3 from 'web3'
import { walletService } from 'services/wallet_service'
import { OpenSeaPort, Network } from 'opensea-js'
import { IApi } from '../../services/types'

import { TOKEN_ADDRESS } from 'core'

export function* createBid(api: IApi, { payload: { tokenId, asset } }: PayloadActio<{ tokenId: string; asset: any }>) {
  try {
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899')
    // Network.Rinkeby for test
    const seaport = new OpenSeaPort(provider, {
      networkName: Network.Rinkeby,
    })

    const startAmount = 0 // The minimum amount to sell for, in normal units (e.g. ETH)
    const expirationTime = Math.round(Date.now() + (1000 + 60 * 60 * 24))
    // const walletAddress = yield walletService.getMetaMaskAccount()
    const paymentTokenAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

    const auction = yield seaport.createSellOrder({
      asset: {
        tokenId,
        tokenAddress: asset.tokenAddress,
      },
      accountAddress: asset.owner.address,
      startAmount,
      expirationTime,
      paymentTokenAddress,
      waitForHighestBid: true,
    })
  } catch (e) {
    console.log(e)
  }
}
