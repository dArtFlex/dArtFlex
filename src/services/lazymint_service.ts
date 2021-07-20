//@ts-nocheck
import HttpStatusCodes from 'http-status-codes'
import { web3Service } from 'services/web3_service'
import { signTypedData_v4 } from 'eth-sig-util'
import { DOMAIN_TYPE, ERC721Types } from 'constant'

const web3 = web3Service.getWeb3()

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
    const { contract, uri, creator } = request.body

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
      // Todo: Should be checked royalty
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
