//@ts-nocheck
import { CommonService } from 'services/common_service'
import { STANDART_TOKEN_ABI } from 'core/contracts/standard_token_contract'
import { AUCTION_CONTRACT_ADDRESS } from 'core/contracts/auction_contract'
import { ZERO, ORDER_TYPES, LAZY_MINT_NFT_ENCODE_PARAMETERS, NFT_ENCODE_PARAMETERS, DOMAIN_TYPE } from 'constant'
import appConst from 'config/consts'

class PlaceBidService extends CommonService {
  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  createOrder(maker, contract, tokenId, uri, erc20, price, signature) {
    return {
      type: 'RARIBLE_V2',
      maker: maker,
      make: {
        assetType: {
          assetClass: signature == '0x' ? 'ERC721' : 'ERC721_LAZY',
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
      return web3.eth.abi.encodeParameters(LAZY_MINT_NFT_ENCODE_PARAMETERS, [
        form.contract,
        [form.tokenId, form.uri, [[form.creator, '10000']], [], [form.signature]],
      ])
    if (form.assetClass == 'ERC721')
      return web3.eth.abi.encodeParameters(NFT_ENCODE_PARAMETERS, [form.contract, form.tokenId])
    if (form.assetClass == 'ERC20') {
      return web3.eth.abi.encodeParameter('address', form.contract)
    }
    return '0x'
  }

  async encodeOrder(form, taker) {
    const makeAsset = form.make.assetType
    const takeAsset = form.take.assetType

    return {
      data: web3.eth.abi.encodeParameters(['tuple(address, uint256)[]', 'tuple(address, uint256)[]'], [[], []]),
      dataType: '0x4c234266',
      maker: taker,
      makeAsset: {
        assetType: {
          assetClass: web3.utils.keccak256(form.take.assetType.assetClass).substring(0, 10),
          data: this.enc(takeAsset),
        },
        value: form.take.value,
      },
      taker: ZERO,
      takeAsset: {
        assetType: {
          assetClass: web3.utils.keccak256(form.make.assetType.assetClass).substring(0, 10),
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
    const { contract, tokenId, uri, maker, taker, erc20, price, signature } = request.body

    const notSignedOrderForm = this.createOrder(maker, contract, tokenId, uri, erc20, price, signature)
    const order = await this.encodeOrder(notSignedOrderForm, taker)
    const data = this.createTypeData(
      {
        name: 'Exchange',
        version: '2',
        chainId: 4,
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
    return await new web3.eth.Contract(STANDART_TOKEN_ABI, '0xc778417E063141139Fce010982780140Aa0cD5Ab').methods
      .approve('0x2fce8435f0455edc702199741411dbcd1b7606ca', appConst.APPROVE_AMOUNT) // Todo: This address should be defined and need to dicuss with solidity dev.
      .send({
        from: wallet,
      })
  }

  async checkAllowance(wallet, token, contractAddress) {
    const tokenContract = new web3.eth.Contract(human_standard_token_abi, token)
    const tokenResp = await tokenContract.methods.allowance(wallet, contractAddress).call()
    return Number(tokenResp) > 0
  }
}

export const placeBidService = new PlaceBidService()
