import {
  UserDataTypes,
  IUserRole,
  AssetDataTypesWithStatus,
  AssetTypes,
  IBidsHistory,
  IImageData,
  AssetMarketplaceTypes,
  AssetDataTypes,
  IPromotionId,
  ITradingHistory,
} from 'types'

export interface UserStateType {
  isOpenSideBar: boolean
  fetching: boolean
  fetchingBids: boolean
  fetchingPromo: boolean
  error: string
  search: string
  user: UserDataTypes | null
  role?: IUserRole
  userAssets: IUserAsset[] | []
  userCollectedAssets: IUserAsset[] | []
  userBids: IUserBid[] | []
  promotionAssets: IPromotionAsset[] | []
  promotionIds: IPromotionId[] | []
  promotionIdLastAdded?: number
  promotionIdLastDelete?: number
  userAll?: UserDataTypes[]
  tradingHistoryAll?: Array<
    ITradingHistory & { imageData: IImageData; fromUserData: UserDataTypes; toUserData: UserDataTypes }
  >
}

export interface IUserAsset extends AssetDataTypesWithStatus {
  tokenData: AssetTypes
}
export interface IUserBid extends IBidsHistory {
  marketData: AssetMarketplaceTypes
  ownerData: UserDataTypes
  ownerProfile: UserDataTypes
  imageData: IImageData
}

export interface IPromotionAsset {
  marketData: AssetMarketplaceTypes | null
  ownerData: UserDataTypes
  imageData: AssetDataTypes['imageData']
  tokenData: AssetTypes
}
