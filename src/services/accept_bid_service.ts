import { web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { ABI, AUCTION_CONTRACT_ADDRESS } from 'core/contracts/auction_contract'
import { IOrderData, IChainId } from 'types'

class AcceptBidService {
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
  public async performMint(creator: IOrderData, buyer: IOrderData): Promise<any> {
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
        creator.maker,
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

    const chainId: IChainId = walletService.getChainId()
    return await this.web3.eth.sendTransaction({
      data: invocation.encodeABI(),
      to: AUCTION_CONTRACT_ADDRESS,
      from: creator.maker,
      chainId,
      gasPrice: '6000000000',
      gas: '10000000',
      // only for WETH
      // value: "20000000000000000"
    })
  }
}

export const acceptBidService = new AcceptBidService()
