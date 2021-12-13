import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { contractAddress } from 'core/contracts/addresses'
import { abiExchangeV2 } from 'core/contracts/abi'
import { IOrderData, IChainName } from 'types'
import { getChainKeyByChainId } from 'utils'

class ClaimBidService {
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
    const chainId: number = walletService.getChainId()
    const chainName: IChainName | undefined = getChainKeyByChainId(chainId)

    if (chainName) {
      this.contract = new this.web3.eth.Contract(abiExchangeV2, contractAddress[chainName].exchangeV2)
      // Creator is owner of Nft
      const creator = walletService.getAccoutns()[0]

      const invocation = this.contract.methods.matchOrders(
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
        seller.signature, // 0x

        // for creator & for buyer
        [
          buyer.maker, // buyer maker
          [[buyer.makeAsset.assetType.assetClass, buyer.makeAsset.assetType.data], buyer.makeAsset.value],
          buyer.taker, // buyer taker
          [[buyer.takeAsset.assetType.assetClass, buyer.takeAsset.assetType.data], buyer.takeAsset.value],
          seller.salt,
          0,
          0,
          buyer.dataType,
          buyer.data,
        ],
        '0x' // buyer signature
      )

      const gasPrice = await this.web3.eth.getGasPrice()
      // Cause this gas price from last block that why it doesn't guarantee that it would be same, then up to 50%
      const gasPriceExtra = Math.round(+gasPrice + (gasPrice / 100) * 50)
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

export const claimBidService = new ClaimBidService()
