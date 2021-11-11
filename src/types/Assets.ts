import { IEntity, IDatedEntity, IDatedTimeEntity, UserDataTypes, IPriceEntity, IImageEntity, IHashtag } from 'types'
import appConst from 'config/consts'
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

export enum MetaFilter {
  ENDING_SOON = 'ending_soon',
  RECENT = 'recently_listed',
  PRICE_LOW_HIGH = 'high_to_low',
  PRICE_HIGH_LOW = 'low_to_high',
}
export type IMetaFilter = 'ending_soon' | 'recently_listed' | 'high_to_low' | 'low_to_high'
export type IMetaOrder = 'DESC' | 'ASC'
export type IMetaStatus = 'listed' | 'pending' | 'offer' | 'offered' | 'canceled' | 'accepted'

export enum MetaType {
  LIVE_AUCTION = 'auction',
  BUY_NOW = 'instant_buy',
  RESERVE_NOT_MET = 'reserve_not_met',
  SOLD = 'sold',
  FEATURED_ARTWORKS = 'featured_artworks',
}
export type IMetaType = 'auction' | 'instant_buy' | 'reserve_not_met' | 'sold' | 'featured_artworks'

export interface IMeta {
  type: IMetaType
  sold: boolean
  filter: IMetaFilter
  search?: string
  hashtags?: string[]
  fromPrice: number
  toPrice: number
  hotOnly: boolean
  limit: number
  offset: number
  order: IMetaOrder
}

export interface IItemGetEntities {
  ban: boolean
  bid: IHighestBid
  chain_id: number
  contract: string
  created_at: string
  creator: string
  etherscan: string
  hashtag: IHashtag[] // (!)
  hashtags: IHashtag[]
  id: number
  lazymint: boolean
  lock: boolean
  marketplace: IAssetMarketData
  metadata: IImageData
  owner: string
  royalty: string
  royalty_fee: string
  signature: string
  token_id: string
  updated_at: string
  uri: string
  user: UserDataTypes
}
