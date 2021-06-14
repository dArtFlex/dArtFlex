//@ts-nocheck
import { web3Service } from 'services/web3_service'
import { signTypedData_v4 } from 'eth-sig-util'

const ZERO = '0x0000000000000000000000000000000000000000'
const orderTypes = {
  AssetType: [
    { name: 'assetClass', type: 'bytes4' },
    { name: 'data', type: 'bytes' },
  ],
  Asset: [
    { name: 'assetType', type: 'AssetType' },
    { name: 'value', type: 'uint256' },
  ],
  Order: [
    { name: 'maker', type: 'address' },
    { name: 'makeAsset', type: 'Asset' },
    { name: 'taker', type: 'address' },
    { name: 'takeAsset', type: 'Asset' },
    { name: 'salt', type: 'uint256' },
    { name: 'start', type: 'uint256' },
    { name: 'end', type: 'uint256' },
    { name: 'dataType', type: 'bytes4' },
    { name: 'data', type: 'bytes' },
  ],
}

const DOMAIN_TYPE = [
  {
    type: 'string',
    name: 'name',
  },
  {
    type: 'string',
    name: 'version',
  },
  {
    type: 'uint256',
    name: 'chainId',
  },
  {
    type: 'address',
    name: 'verifyingContract',
  },
]

class OrderService {
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
              method: 'eth_signTypedData_v4',
              params: [from, msgData],
              from,
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
    Math.floor(Math.random() * (max - min)) + min
  }

  createOrder(maker, contract, tokenId, price) {
    return {
      type: 'RARIBLE_V2',
      maker: maker,
      make: {
        assetType: {
          assetClass: 'ERC721',
          contract: contract,
          tokenId: tokenId,
        },
        value: '1',
      },
      take: {
        assetType: {
          assetClass: 'ETH',
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

  enc(token, tokenId) {
    if (tokenId) {
      return web3.eth.abi.encodeParameters(['address', 'uint256'], [token, tokenId])
    } else {
      return web3.eth.abi.encodeParameter('address', token)
    }
  }

  async encodeOrder(form) {
    const makeAssetData = form.make.assetType.tokenId
      ? this.enc(form.make.assetType.contract, form.make.assetType.tokenId)
      : '0x'
    const takeAssetData = form.take.assetType.tokenId
      ? this.enc(form.take.assetType.contract, form.take.assetType.tokenId)
      : '0x'
    return {
      data: web3.eth.abi.encodeParameters(['tuple(address, uint256)[]', 'tuple(address, uint256)[]'], [[], []]),
      dataType: '0x4c234266',
      maker: form.maker,
      makeAsset: {
        assetType: {
          assetClass: web3.utils.keccak256(form.make.assetType.assetClass).substring(0, 10),
          data: makeAssetData,
        },
        value: form.make.value,
      },
      taker: ZERO,
      takeAsset: {
        assetType: {
          assetClass: web3.utils.keccak256(form.take.assetType.assetClass).substring(0, 10),
          data: takeAssetData,
        },
        value: form.take.value,
      },
      start: 0,
      end: 0,
      salt: form.salt,
    }
  }

  async encodeOrderBuyer(form, taker) {
    const makeAssetData = form.make.assetType.tokenId
      ? this.enc(form.make.assetType.contract, form.make.assetType.tokenId)
      : '0x'
    const takeAssetData = form.take.assetType.tokenId
      ? this.enc(form.take.assetType.contract, form.take.assetType.tokenId)
      : '0x'
    return {
      data: web3.eth.abi.encodeParameters(['tuple(address, uint256)[]', 'tuple(address, uint256)[]'], [[], []]),
      dataType: '0x4c234266',
      maker: taker,
      makeAsset: {
        assetType: {
          assetClass: web3.utils.keccak256(form.take.assetType.assetClass).substring(0, 10),
          data: takeAssetData,
        },
        value: form.take.value,
      },
      taker: ZERO,
      takeAsset: {
        assetType: {
          assetClass: web3.utils.keccak256(form.make.assetType.assetClass).substring(0, 10),
          data: makeAssetData,
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
    const { contract, tokenId, maker, taker, price } = request.body
    const notSignedOrderForm = this.createOrder(maker, contract, tokenId, price)

    const order = await this.encodeOrder(notSignedOrderForm)
    const orderBuyer = await this.encodeOrderBuyer(notSignedOrderForm, taker)
    const data = this.createTypeData(
      {
        name: 'Exchange',
        version: '2',
        chainId: 4,
        verifyingContract: '0x1e1B6E13F0eB4C570628589e3c088BC92aD4dB45',
      },
      'Order',
      order,
      orderTypes
    )

    const signature = await this.signTypedData(data)
    return [{ ...order, signature }, orderBuyer]
  }
}

export const orderService = new OrderService()
