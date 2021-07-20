import {
  UserDataTypes,
  IUserRole,
  AssetDataTypesWithStatus,
  AssetTypes,
  IBidsHistory,
  IImageData,
  AssetMarketplaceTypes,
  AssetDataTypes,
} from 'types'

export interface UserStateType {
  isOpenSideBar: boolean
  fetching: boolean
  fetchingBids: boolean
  fetchingPromo: boolean
  error: string
  user: UserDataTypes | null
  role?: IUserRole
  userAssets: IUserAsset[] | []
  userBids: IUserBid[] | []
  promotionAssets: IPromotionAsset[] | []
  promotionIds: number[] | []
}

export interface IUserAsset extends AssetDataTypesWithStatus {
  tokenData: AssetTypes
}
export interface IUserBid extends IBidsHistory {
  marketData: AssetMarketplaceTypes
  ownerData: UserDataTypes
  imageData: IImageData
}

export interface IPromotionAsset {
  marketData: AssetMarketplaceTypes | null
  ownerData: UserDataTypes
  imageData: AssetDataTypes['imageData']
  tokenData: AssetTypes
}
