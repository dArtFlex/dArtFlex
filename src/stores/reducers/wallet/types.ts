import { IWallet, ITokenBalances } from 'types'
export interface WalletsStateType {
  wallet: IWallet | null
  tokensBalances: ITokenBalances[] | []
  fetching: boolean
  error: string
}
