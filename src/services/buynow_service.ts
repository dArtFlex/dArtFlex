import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { contractAddress } from 'core/contracts/addresses'
import { abiExchangeV2 } from 'core/contracts/abi'
import { IOrderData, IChainName } from 'types'
import { getChainKeyByChainId } from 'utils'
class BuyNowService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public contract: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public web3: any

  constructor() {
    const web3 = web3Service.getWeb3()
    if (!web3) {
      return
    }
    this.web3 = web3
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async performMint(creator: IOrderData, accounts: string, amount: string): Promise<any> {
    const chainId: number = walletService.getChainId()
    const chainName: IChainName | undefined = getChainKeyByChainId(chainId)

    if (chainName) {
      this.contract = new this.web3.eth.Contract(abiExchangeV2, contractAddress[chainName].exchangeV2)

      const invocation = this.contract.methods.matchOrders(
        // for buyer
        [
          creator.maker,
          [[creator.makeAsset.assetType.assetClass, creator.makeAsset.assetType.data], creator.makeAsset.value],
          creator.taker,
          [[creator.takeAsset.assetType.assetClass, creator.takeAsset.assetType.data], creator.takeAsset.value],
          creator.salt,
          0, // always 0
          0, // always 0
          creator.dataType,
          creator.data,
        ],
        creator.signature,

        // for creator & for buyer
        [
          accounts,
          [[creator.takeAsset.assetType.assetClass, creator.takeAsset.assetType.data], creator.takeAsset.value],

          creator.maker,
          [[creator.makeAsset.assetType.assetClass, creator.makeAsset.assetType.data], creator.makeAsset.value],
          creator.salt,
          0,
          0,
          creator.dataType,
          creator.data,
        ],
        '0x'
      )

      const gasPrice = await this.web3.eth.getGasPrice()
      // Cause this gas price from last block that why it doesn't guarantee that it would be same, then up to 10%
      const gasPriceExtra = Math.round(+gasPrice + (gasPrice / 100) * 10)
      return await this.web3.eth.sendTransaction({
        data: invocation.encodeABI(),
        to: contractAddress[chainName].exchangeV2,
        from: accounts,
        chainId,
        gasPrice: gasPriceExtra,
        gas: '10000000',
        value: amount,
      })
    }
  }
}

export const buyNowService = new BuyNowService()
