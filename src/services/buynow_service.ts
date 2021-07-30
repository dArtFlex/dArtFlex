import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { ABI, AUCTION_CONTRACT_ADDRESS } from 'core/contracts/auction_contract'
import { IOrderData, IChainId } from 'types'
class BuyNowService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public contract: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public web3: any

  constructor() {
    const web3 = web3Service.getWeb3()
    this.web3 = web3
    this.contract = new web3.eth.Contract(ABI, AUCTION_CONTRACT_ADDRESS)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async performMint(creator: IOrderData, accounts: string, amount: string): Promise<any> {
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

    const chainId: IChainId = walletService.getChainId()
    const chaingIdNumber = chainId.match(/^0x(.+)/)
    return await this.web3.eth.sendTransaction({
      data: invocation.encodeABI(),
      to: AUCTION_CONTRACT_ADDRESS,
      from: accounts,
      chainId: chaingIdNumber ? +chaingIdNumber[1] : 4, // Default network Rinkeby
      gasPrice: '6000000000',
      gas: '10000000',
      // only for WETH
      value: amount, // bid amount
    })
  }
}

export const buyNowService = new BuyNowService()
