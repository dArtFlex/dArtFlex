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
  IError,
} from 'types'

export interface UserStateType {
  isOpenSideBar: boolean
  fetching: boolean
  fetchingBids: boolean
  fetchingPromo: boolean
  isId: boolean
  fetchingId: boolean
  error: IError
  search: string
  user: UserDataTypes | null
  role?: IUserRole
  userAssets: IUserAsset[] | []
  userCollectedAssets: IUserAsset[] | []
  userSolddAssets: IUserAsset[] | []
  userBids: IUserBid[] | []
  promotionAssets: IPromotionAsset[] | []
  promotionIds: IPromotionId[] | []
  promotionIdLastAdded?: number
  promotionIdLastDelete?: number
  userAll?: UserDataTypes[]
  userIdValid?: boolean
  tradingHistoryAll?: Array<
    ITradingHistory & { imageData: IImageData; fromUserData: UserDataTypes; toUserData: UserDataTypes }
  >
  activeBids: IActiveUserBids[]
  success: string
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

export interface IActiveUserBids {
  id: number
  item_id: number
  order_id: number
  user_id: number
  market_id: number
  bid_amount: number
  status: string
}
