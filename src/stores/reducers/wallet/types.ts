import { IWallet, ITokenBalances, IError, IChainName } from 'types'
export interface WalletsStateType {
  wallet: IWallet | null
  tokensBalances: ITokenBalances[] | []
  fetching: boolean
  error: IError
  chainName?: IChainName
  chainError?: IChainName
}
