//@ts-nocheck
import HttpStatusCodes from 'http-status-codes'
import { web3Service } from 'services/web3_service'
import { signTypedData_v4 } from 'eth-sig-util'

const web3 = web3Service.getWeb3()

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

const ERC721Types = {
  Part: [
    { name: 'account', type: 'address' },
    { name: 'value', type: 'uint96' },
  ],
  Mint721: [
    { name: 'tokenId', type: 'uint256' },
    { name: 'tokenURI', type: 'string' },
    { name: 'creators', type: 'Part[]' },
    { name: 'royalties', type: 'Part[]' },
  ],
}
class LazyMintService {
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

  async generateTokenId(creator) {
    const nonce = creator + web3.utils.randomHex(12).slice(2)
    const tokenId = web3.utils.toBN(nonce).toString()
    return tokenId
  }

  async generateLazyMint(request, response) {
    const { contract, uri, creator, royalty } = request.body

    if (!contract || !uri || !creator) {
      return response.status(HttpStatusCodes.BAD_REQUEST).send('Missing Data')
    }

    const tokenId = await this.generateTokenId(creator)

    const form = {
      '@type': 'ERC721',
      contract: contract,
      tokenId: tokenId,
      uri: uri,
      creators: [{ account: creator, value: '10000' }],
      // Todo: Should be checked rayalty
      royalties: [],
    }

    const data = this.createTypeData(
      {
        name: 'Mint721',
        version: '1',
        chainId: 4,
        verifyingContract: contract,
      },
      'Mint721',
      { ...form, tokenURI: uri },
      ERC721Types
    )

    const signature = await this.signTypedData(data)
    return { ...form, signatures: [signature] }
  }
}

export const lazyMintService = new LazyMintService()
