import { UserDataTypes, ITokenBalances } from 'types'

export interface UserStateType {
  isOpenSideBar: boolean
  fetching: boolean
  error: string
  user: UserDataTypes | null
  balances: ITokenBalances[] | []
}
