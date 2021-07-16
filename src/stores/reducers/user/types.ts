import { UserDataTypes, IUserRole } from 'types'

export interface UserStateType {
  isOpenSideBar: boolean
  fetching: boolean
  error: string
  user: UserDataTypes | null
  role?: IUserRole
}
