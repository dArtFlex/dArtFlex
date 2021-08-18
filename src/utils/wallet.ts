import APP_CONSTS from 'config/consts'
import { IWallet } from 'types'

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
  const allowedNetworks = ['0x1', '0x4', 1, 4]
  return !allowedNetworks.some((network) => network === chainId)
}
