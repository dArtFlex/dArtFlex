export interface IWallet {
  accounts: string[]
  balance: number
  meta: {
    coinAbbr: string
  }
}
