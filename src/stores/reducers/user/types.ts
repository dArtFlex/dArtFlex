import { UserDataTypes, IUserRole, AssetDataTypesWithStatus, AssetTypes } from 'types'

export interface UserStateType {
  isOpenSideBar: boolean
  fetching: boolean
  error: string
  user: UserDataTypes | null
  role?: IUserRole
  userAssets:
    | Array<
        AssetDataTypesWithStatus & {
          tokenData: AssetTypes
        }
      >
    | []
}
