import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { contractAddress } from 'core/contracts/addresses'
import { abiExchangeV2 } from 'core/contracts/abi'
import { IOrderData, IChainName } from 'types'
import { getChainKeyByChainId } from 'utils'

class AcceptBidService {
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
  public async performMint(seller: IOrderData, buyer: IOrderData): Promise<any> {
    // Creator is owner of Nft
    // const web3 = web3Service.getWeb3()
    const chainId: number = walletService.getChainId()
    const chainName: IChainName | undefined = getChainKeyByChainId(chainId)

    if (chainName) {
      const contract = new this.web3.eth.Contract(abiExchangeV2, contractAddress[chainName].exchangeV2)
      const creator = walletService.getAccoutns()[0]

      const invocation =
        contract &&
        contract.methods.matchOrders(
          // for buyer
          [
            seller.maker, // seller maker
            [[seller.makeAsset.assetType.assetClass, seller.makeAsset.assetType.data], seller.makeAsset.value],
            seller.taker, // 0x
            [[seller.takeAsset.assetType.assetClass, seller.takeAsset.assetType.data], seller.takeAsset.value],
            seller.salt,
            0, // always 0
            0, // always 0
            seller.dataType,
            seller.data,
          ],
          '0x', // 0x

          // for creator & for buyer
          [
            buyer.maker, // buyer maker
            [[buyer.makeAsset.assetType.assetClass, buyer.makeAsset.assetType.data], buyer.makeAsset.value],
            buyer.taker, // buyer taker
            [[buyer.takeAsset.assetType.assetClass, buyer.takeAsset.assetType.data], buyer.takeAsset.value],
            buyer.salt,
            0,
            0,
            buyer.dataType,
            buyer.data,
          ],
          buyer.signature // buyer signature
        )

      const gasPrice: string = await this.web3.eth.getGasPrice()
      // Cause this gas price from last block that why it doesn't guarantee that it would be same, then up to 10%
      const gasPriceExtra = Math.round(+gasPrice + (+gasPrice / 100) * 10)
      return await this.web3.eth.sendTransaction({
        data: invocation.encodeABI(),
        to: contractAddress[chainName].exchangeV2,
        from: creator,
        chainId,
        gasPrice: gasPriceExtra,
        gas: '10000000',
        // only for WETH
        // value: "20000000000000000"
      })
    }
  }
}

export const acceptBidService = new AcceptBidService()
