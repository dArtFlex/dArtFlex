import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { contractAddress } from 'core/contracts/addresses'
import { abiExchangeV2 } from 'core/contracts/abi'
import { IOrderData, IChainName } from 'types'
import { getChainKeyByChainId } from 'utils'

class MakeOfferService {
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
  public async performMint(creator: IOrderData, buyer: IOrderData): Promise<any> {
    const chainId: number = walletService.getChainId()
    const chainName: IChainName | undefined = getChainKeyByChainId(chainId)

    if (chainName) {
      this.contract = new this.web3.eth.Contract(abiExchangeV2, contractAddress[chainName].exchangeV2)

      const acc: string[] = walletService.getAccoutns()
      const invocation = this.contract.methods.matchOrders(
        // for buyer
        [
          buyer.maker,
          [[buyer.makeAsset.assetType.assetClass, buyer.makeAsset.assetType.data], buyer.makeAsset.value],
          buyer.taker,
          [[buyer.takeAsset.assetType.assetClass, buyer.takeAsset.assetType.data], buyer.takeAsset.value],
          buyer.salt,
          0, // always 0
          0, // always 0
          buyer.dataType,
          buyer.data,
        ],
        buyer.signature,

        // for creator & for buyer
        [
          acc[0], // <-- should be owner of nft
          [[buyer.takeAsset.assetType.assetClass, buyer.takeAsset.assetType.data], buyer.takeAsset.value],

          buyer.maker,
          [[buyer.makeAsset.assetType.assetClass, buyer.makeAsset.assetType.data], buyer.makeAsset.value],
          buyer.salt,
          0,
          0,
          buyer.dataType,
          buyer.data,
        ],
        '0x'
      )

      const gasPrice = await this.web3.eth.getGasPrice()
      // Cause this gas price from last block that why it doesn't guarantee that it would be same, then up to 10%
      const gasPriceExtra = Math.round(+gasPrice + (gasPrice / 100) * 10)

      return await this.web3.eth.sendTransaction({
        data: invocation.encodeABI(),
        to: contractAddress[chainName].exchangeV2,
        from: acc[0],
        chainId,
        gasPrice: gasPriceExtra,
        gas: '10000000',
        // only for WETH
        // value: "20000000000000000"
      })
    }
  }
}

export const makeOfferService = new MakeOfferService()
