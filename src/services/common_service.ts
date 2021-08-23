//@ts-nocheck
import { Web3Service } from 'services/web3_service'
import { walletService } from 'services/wallet_service'
import { signTypedData_v4 } from 'eth-sig-util'

export class CommonService extends Web3Service {
  async signTypedData(data) {
    // Connect to current web3 provider
    const web3 = await walletService.getWeb3()

    const resp = await web3.eth.getAccounts()
    const from = resp[0]

    if (web3.currentProvider) {
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
}
