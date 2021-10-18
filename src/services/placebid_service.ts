//@ts-nocheck
import { CommonService } from 'services/common_service'
import { STANDART_TOKEN_ABI } from 'core/contracts/standard_token_contract'
import { walletService } from 'services/wallet_service'
import { AUCTION_CONTRACT_ADDRESS } from 'core/contracts/auction_contract'
import { ERC20_TRANSFER_PROXY_ADDRESS } from 'core/contracts/lazy_mint_contract'
import { ORDER_TYPES, LAZY_MINT_NFT_ENCODE_PARAMETERS, NFT_ENCODE_PARAMETERS, DOMAIN_TYPE } from 'constant'
import appConst from 'config/consts'
import { IChainIdFormat } from 'types'

export class PlaceBidService extends CommonService {
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
        [form.tokenId, form.uri, [[form.creator, '10000']], [], [form.signature]],
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
    const { contract, tokenId, uri, maker, taker, erc20, price, signature, lazymint } = request.body
    const notSignedOrderForm = this.createOrder(maker, contract, tokenId, uri, erc20, price, signature, lazymint)
    const order = await this.encodeOrder(notSignedOrderForm, taker)

    const chainId: IChainIdFormat = walletService.getChainId()
    const data = this.createTypeData(
      {
        name: 'Exchange',
        version: '2',
        chainId,
        verifyingContract: AUCTION_CONTRACT_ADDRESS,
      },
      'Order',
      order,
      ORDER_TYPES
    )

    const signatureOrder = await this.signTypedData(data)
    return [{ ...order, signatureOrder }]
  }

  async approveToken(wallet) {
    // Todo: Approve address contract shouldn't be WETH only
    return await new this.web3.eth.Contract(STANDART_TOKEN_ABI, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd').methods // Should be Token Address
      .approve(ERC20_TRANSFER_PROXY_ADDRESS, appConst.APPROVE_AMOUNT) // ERC20 transfer proxy address
      .send({
        from: wallet,
      })
  }

  async checkAllowance(wallet, token) {
    const tokenContract = new this.web3.eth.Contract(STANDART_TOKEN_ABI, token)
    const tokenResp = await tokenContract.methods.allowance(wallet, ERC20_TRANSFER_PROXY_ADDRESS).call()
    return Number(tokenResp) > 0
  }
}

export const placeBidService = new PlaceBidService()
