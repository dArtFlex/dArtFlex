import { IEntity, IDatedEntity, IDatedTimeEntity, UserDataTypes, IPriceEntity, IImageEntity } from 'types'
import appConst from 'config/consts'
import { IHashtag } from 'types'
import { IHighestBid, IMarketPlaceInfo } from '../stores/reducers/user/types'

const { TYPES, STATUSES, FILTER_VALUES } = appConst
export interface AssetMarketplaceTypes extends IEntity, IDatedEntity, IDatedTimeEntity, IPriceEntity {
  item_id: string
  type: IAssetType
  platform_fee: string
  sales_token_contract: string
  contract: string
  sold: boolean
  ban?: boolean
}

export interface AssetTypes extends IEntity, IDatedEntity {
  contract: string
  token_id: string
  uri: string
  creator: string
  owner: string
  royalty: string
  royalty_fee: number
  signature: string
  lazymint: boolean
  ban: boolean
  hashtag: IHashtag[]
  marketplace: IAssetMarketData[]
  etherscan: string
}

export interface AssetDataTypes extends AssetMarketplaceTypes {
  imageData: IImageData
  userData: UserDataTypes
  tokenData?: AssetTypes
  highest_bid?: IHighestBid[]
  highest_offer?: IHighestBid[]
  marketplace?: IMarketPlaceInfo[]
  isBidded?: boolean
}

export interface AssetDataTypesWithStatus extends AssetDataTypes {
  status: IAssetStatus
  tokenSymbol: string
}

export interface IImageData extends IImageEntity {
  attribute: string
  description: string
}

export type IAssetType = typeof TYPES.AUCTION | typeof TYPES.INSTANT_BY

export type IAssetStatus =
  | typeof STATUSES.MINTED
  | typeof STATUSES.LISTED
  | typeof STATUSES.UNLISTED
  | typeof STATUSES.ON_SALE
  | typeof STATUSES.PURCHASED
  | typeof STATUSES.SOLD

export type IArtworksFiltes =
  | typeof FILTER_VALUES.LIVE_AUCTION
  | typeof FILTER_VALUES.BUY_NOW
  | typeof FILTER_VALUES.RESERVE_NOT_MET
  | typeof FILTER_VALUES.SOLD
  | typeof FILTER_VALUES.FEATURED_ARTWORKS

export interface ITokenBalances {
  balance: string
  balanceUSD: number
  id: string
  priceUSD: number
  symbol: string
}

export interface IAssetMarketData {
  id: number
  item_id: string
  type: IAssetStatus
  start_price: string
  end_price: string
  start_time: string
  end_time: string
  platform_fee: string
  sales_token_contract: string
  sold: boolean
  created_at: string
  updated_at: string
  current_price: string
}
