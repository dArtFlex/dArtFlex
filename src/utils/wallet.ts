import APP_CONFIG from 'config/consts'
import { IWallet } from 'types'

export function storageActiveWallet(wallet: IWallet, walletStorageKey: string) {
  localStorage.setItem(walletStorageKey, JSON.stringify(wallet))
  localStorage.setItem(APP_CONFIG.ACTIVE_WALLET_STORAGE, walletStorageKey)
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
