import APP_CONSTS from 'config/consts'
import { IWallet, IChainId, IChainIdFormat, IBaseTokens } from 'types'
import tokensAll from 'core/tokens'

export function storageActiveWallet(wallet: IWallet, walletStorageKey: string) {
  localStorage.setItem(walletStorageKey, JSON.stringify(wallet))
  localStorage.setItem(APP_CONSTS.ACTIVE_WALLET_STORAGE, walletStorageKey)
}

export function createWalletInstance(accounts: string | string[], balance: number, coinAbbr: string) {
  const combineAccounts = typeof accounts === 'string' ? [accounts] : accounts
  return { accounts: combineAccounts, balance, meta: { coinAbbr } }
}

export function shortCutWallet(account: string) {
  if (account.length < 14) {
    return account
  }
  return `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`
}

export function parseJS(d: string | null) {
  return d ? JSON.parse(d) : ''
}

export function getWalletsFromHistory() {
  const activeWallet = localStorage.getItem(APP_CONSTS.ACTIVE_WALLET_STORAGE)
  const connectedMetaMask = parseJS(localStorage.getItem(APP_CONSTS.WALLET_CONNECT_STORAGE.METAMASK))
  const connectedWalletConnect = parseJS(localStorage.getItem(APP_CONSTS.WALLET_CONNECT))
  return { activeWallet, connectedMetaMask, connectedWalletConnect }
}

export function notSupportedNetwork(chainId: string | number) {
  const allowedNetworks = ['0x1', '0x4', '0x38', 1, 4, 38]
  return !allowedNetworks.some((network) => network === chainId)
}

export function networkConvertor(chainId: IChainId): IChainIdFormat {
  switch (chainId) {
    case 1:
      return '0x1'
    case 4:
      return '0x4'
    case 38:
      return '0x38'
    default:
      return chainId
  }
}

export function getProviderAddress(url: string) {
  const regExp: string | RegExp = new RegExp('(http://mainnet.infura.io/v3/)|(http://rinkeby.infura.io/v3/)', 'i')
  return url.replace(regExp, '')
}

export function getTokenInfoByChainId(chainId: IChainId, erc20TokenId?: string) {
  return tokensAll[networkConvertor(chainId)].find((t: IBaseTokens) =>
    erc20TokenId ? t.id === erc20TokenId : t.id === '0x'
  )
}
