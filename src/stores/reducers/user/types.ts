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
  userSoldAssets: Array<IUserSoldAssets> | []
  userCreatedAssets: IUserAsset[] | []
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
  biddedOfferedAssets: IBiddedOfferedAsset[]
}

export type IUserSoldAssets = Omit<IUserAsset, 'maretplace'> & { marketplace: IMarketplaceSoldInfo[] }

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

export interface IBiddedOfferedAsset {
  id: number
  contract: string
  token_id: string
  uri: string
  creator: string
  owner: string
  royalty: string
  royalty_fee: string
  signature: string
  ban: boolean
  lazymint: boolean
  created_at: string
  updated_at: string
  image_url: string
  status: string
  image_name: string
  highest_bid: IHighestBid[]
  highest_offer: IHighestBid[]
  marketplace: IMarketPlaceInfo[]
}

export interface IHighestBid {
  id: number
  item_id: string
  order_id: string
  user_id: string
  market_id: string
  bid_amount: string
  status: string
  created_at: string
  updated_at: string
}

export interface IMarketPlaceInfo {
  id: number
  item_id: string
  type: string
  start_price: string
  end_price: string
  current_price: string
  start_time: string
  end_time: string
  platform_fee: string
  sales_token_contract: string
  sold: boolean
  created_at: string
  updated_at: string
  bid_amount?: string
}

export interface IMarketplaceSoldInfo extends IMarketPlaceInfo {
  bid_amount: string
  bid_id: string
  from: string
  to: string
  tx_hash: string
}
