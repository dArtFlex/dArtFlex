import {
  UserDataTypes,
  IUserRole,
  AssetDataTypesWithStatus,
  AssetTypes,
  IBidsHistory,
  IImageData,
  AssetMarketplaceTypes,
} from 'types'

export interface UserStateType {
  isOpenSideBar: boolean
  fetching: boolean
  fetchingBids: boolean
  error: string
  user: UserDataTypes | null
  role?: IUserRole
  userAssets: IUserAsset[] | []
  userBids: IUserBid[] | []
}

export interface IUserAsset extends AssetDataTypesWithStatus {
  tokenData: AssetTypes
}
export interface IUserBid extends IBidsHistory {
  marketData: AssetMarketplaceTypes
  ownerData: UserDataTypes
  imageData: IImageData
}
