import APP_CONFIG from 'config'
import { IWallet } from 'stores/reducers/wallet/types'

export function storageActiveWallet(wallet: IWallet, walletStorageKey: string) {
  localStorage.setItem(walletStorageKey, JSON.stringify(wallet))
  localStorage.setItem(APP_CONFIG.activeWalletStorage, walletStorageKey)
}

export function createWalletInstance(accounts: string | string[], balance: number, coinAbbr: string) {
  const combineAccounts = typeof accounts === 'string' ? [accounts] : accounts
  return { accounts: combineAccounts, balance, meta: { coinAbbr } }
}
