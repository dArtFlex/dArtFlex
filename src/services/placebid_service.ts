//@ts-nocheck
import { CommonService } from 'services/common_service'
import { walletService } from 'services/wallet_service'
import { contractAddress } from 'core/contracts/addresses'
import { abiStandardToken } from 'core/contracts/abi'
import { ORDER_TYPES, LAZY_MINT_NFT_ENCODE_PARAMETERS, NFT_ENCODE_PARAMETERS, DOMAIN_TYPE } from 'constant'
import appConst from 'config/consts'
import { IChainName } from 'types'
import { getChainKeyByChainId } from 'utils'

export class PlaceBidService extends CommonService {
  keyChain!: IChainName

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  createOrder(maker, contract, tokenId, uri, erc20, price, signature, lazymint) {
    return {
      type: 'RARIBLE_V2',
      maker: maker,
      make: {
        assetType: {
          assetClass: lazymint ? 'ERC721_LAZY' : 'ERC721',
          contract: contract,
          tokenId: tokenId,
          uri,
          creator: maker,
          signature,
        },
        value: '1',
      },
      take: {
        assetType: {
          assetClass: erc20 == '0x' ? 'ETH' : 'ERC20',
          contract: erc20,
        },
        value: price,
      },
      data: {
        dataType: 'RARIBLE_V2_DATA_V1',
        payouts: [],
        originFees: [],
      },
      salt: `${this.random(1, 10000)}`,
    }
  }

  enc(form) {
    if (form.assetClass == 'ERC721_LAZY')
      return this.web3.eth.abi.encodeParameters(LAZY_MINT_NFT_ENCODE_PARAMETERS, [
        form.contract,
        [
          form.tokenId,
          form.uri,
          [[form.creator, '10000']],
          [[this.royalty[0].account, this.royalty[0].value]], // Royalty Data
          [form.signature],
        ],
      ])
    if (form.assetClass == 'ERC721')
      return this.web3.eth.abi.encodeParameters(NFT_ENCODE_PARAMETERS, [form.contract, form.tokenId])
    if (form.assetClass == 'ERC20') {
      return this.web3.eth.abi.encodeParameter('address', form.contract)
    }
    return '0x'
  }

  async encodeOrder(form, taker) {
    const makeAsset = form.make.assetType
    const takeAsset = form.take.assetType

    return {
      data: this.web3.eth.abi.encodeParameters(['tuple(address, uint256)[]', 'tuple(address, uint256)[]'], [[], []]),
      dataType: '0x4c234266',
      maker: taker,
      makeAsset: {
        assetType: {
          assetClass: this.web3.utils.keccak256(form.take.assetType.assetClass).substring(0, 10),
          data: this.enc(takeAsset),
        },
        value: form.take.value,
      },
      taker: makeAsset.creator,
      takeAsset: {
        assetType: {
          assetClass: this.web3.utils.keccak256(form.make.assetType.assetClass).substring(0, 10),
          data: this.enc(makeAsset),
        },
        value: form.make.value,
      },
      start: 0,
      end: 0,
      salt: form.salt,
    }
  }

  createTypeData(domainData, primaryType, message, types) {
    return {
      types: Object.assign(
        {
          EIP712Domain: DOMAIN_TYPE,
        },
        types
      ),
      domain: domainData,
      primaryType: primaryType,
      message: message,
    }
  }

  // Maket is creater Nft
  // Taker is ZERO
  async generateOrder(request) {
    const { contract, tokenId, uri, maker, taker, erc20, price, signature, lazymint, royalty } = request.body
    this.royalty = royalty

    const notSignedOrderForm = this.createOrder(maker, contract, tokenId, uri, erc20, price, signature, lazymint)
    const order = await this.encodeOrder(notSignedOrderForm, taker)

    const chainId: number = walletService.getChainId()
    const chainName = getChainKeyByChainId(chainId)
    const contractAuction = chainName && contractAddress[chainName].exchangeV2
    const data = this.createTypeData(
      {
        name: 'Exchange',
        version: '2',
        chainId,
        verifyingContract: contractAuction,
      },
      'Order',
      order,
      ORDER_TYPES
    )

    const signatureOrder = await this.signTypedData(data)
    return [{ ...order, signatureOrder }]
  }

  async approveToken(wallet: string, tokenAddress: string) {
    const chainId: number = walletService.getChainId()
    const chainName = getChainKeyByChainId(chainId)
    // Todo: Approve address contract shouldn't be WETH only
    return await new this.web3.eth.Contract(abiStandardToken, tokenAddress).methods // Should be Token Address
      .approve(contractAddress[chainName].erc20TransferProxy, appConst.APPROVE_AMOUNT) // ERC20 transfer proxy address
      .send({
        from: wallet,
      })
  }

  async checkAllowance(wallet: string, token: string): boolean {
    const chainId: number = walletService.getChainId()
    const chainName = getChainKeyByChainId(chainId)
    const tokenContract = new this.web3.eth.Contract(abiStandardToken, token)
    const tokenResp = await tokenContract.methods
      .allowance(wallet, contractAddress[chainName].erc20TransferProxy)
      .call()
    return Number(tokenResp) > 0
  }
}

export const placeBidService = new PlaceBidService()
