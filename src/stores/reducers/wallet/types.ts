export interface WalletsStateType {
  wallet: IWallet | null
  fetching: boolean
  error: string
}

export interface IWallet {
  accounts: string[]
  balance: number
  coin: string
  meta: {
    customName: string
    name: string
  }
}
