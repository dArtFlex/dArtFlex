//@ts-nocheck
import { web3Service } from 'services/web3_service'
import { signTypedData_v4 } from 'eth-sig-util'
import { ZERO, ORDER_TYPES, LAZY_MINT_NFT_ENCODE_PARAMETERS, NFT_ENCODE_PARAMETERS, DOMAIN_TYPE } from 'constant'

class PlaceBidService {
  async signTypedData(data) {
    const resp = await web3Service.connectMetaMaskWallet()
    const from = resp[0]

    if (web3.currentProvider.isMetaMask) {
      const msgData = JSON.stringify(data)
      return (
        await new Promise((resolve, reject) => {
          function cb(err, result) {
            if (err) return reject(err)
            if (result.error) return reject(result.error)
            const sig = result.result
            const sig0 = sig.substring(2)
            const r = '0x' + sig0.substring(0, 64)
            const s = '0x' + sig0.substring(64, 128)
            const v = parseInt(sig0.substring(128, 130), 16)
            resolve({ data, sig, v, r, s })
          }

          // @ts-ignore
          return web3.currentProvider.sendAsync(
            {
              jsonrpc: '2.0',
              method: 'eth_signTypedData_v4',
              params: [from, msgData],
              from,
              id: new Date().getTime(),
            },
            cb
          )
        })
      ).sig
    } else {
      return signTypedData_v4(web3.currentProvider.wallets[from.toLowerCase()].privateKey, { data })
    }
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  createOrder(maker, contract, tokenId, uri, erc20, price, signature) {
    return {
      type: 'RARIBLE_V2',
      maker: maker,
      make: {
        assetType: {
          assetClass: 'ERC721',
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

  // maket is creater nft
  // taker is ZERO
  // price = '100000000000000000'
  async generateOrder(request) {
    const { contract, tokenId, uri, maker, taker, erc20, price, signature } = request.body

    const notSignedOrderForm = this.createOrder(maker, contract, tokenId, uri, erc20, price, signature)
    const order = await this.encodeOrder(notSignedOrderForm, taker)
    const data = this.createTypeData(
      {
        name: 'Exchange',
        version: '2',
        chainId: 4,
        verifyingContract: '0x1e1B6E13F0eB4C570628589e3c088BC92aD4dB45',
      },
      'Order',
      order,
      ORDER_TYPES
    )

    const signatureOrder = await this.signTypedData(data)
    return [{ ...order, signatureOrder }]
  }
}

export const placeBidService = new PlaceBidService()
