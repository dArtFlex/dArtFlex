import { IEntity, IDatedEntity, IDatedTimeEntity, UserDataTypes, IPriceEntity, IImageEntity } from 'types'
import appConst from 'config/consts'
import { IHashtag } from 'types'
import { AST } from 'eslint'
import TokenType = AST.TokenType

const { TYPES, STATUSES } = appConst
export interface AssetMarketplaceTypes extends IEntity, IDatedEntity, IDatedTimeEntity, IPriceEntity {
  item_id: string
  type: IAssetType
  platform_fee: string
  sales_token_contract: string
  sold: boolean
}

export interface AssetTypes extends IEntity, IDatedEntity {
  contract: string
  token_id: string
  uri: string
  creator: string
  owner: string
  royalty: number
  royalty_fee: number
  signature: string
  lazymint: boolean
  ban: boolean
  hashtag: IHashtag[]
}

export interface AssetDataTypes extends AssetMarketplaceTypes {
  imageData: IImageData
  userData: UserDataTypes
  tokenData?: AssetTypes
}

export interface AssetDataTypesWithStatus extends AssetDataTypes {
  status: IAssetStatus
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

export interface ITokenBalances {
  balance: string
  balanceUSD: number
  id: string
  priceUSD: number
  symbol: string
}

export interface IBaseTokens {
  name: string
  id: string
  erc20id?: string
  symbol: string
  decimals: number
  logoURI: string
}

export interface IAssetMarketData {
  id: number
  item_id: string
  type: string
  start_price: string
  end_price: string
  start_time: string
  end_time: string
  platform_fee: string
  sales_token_contract: string
  sold: false
  created_at: string
  updated_at: string
}
