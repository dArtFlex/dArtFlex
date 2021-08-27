import { IWallet, ITokenBalances, IError } from 'types'
export interface WalletsStateType {
  wallet: IWallet | null
  tokensBalances: ITokenBalances[] | []
  fetching: boolean
  error: IError
}
