import {
  AssetDataTypes,
  AssetTypes,
  AssetMarketplaceTypes,
  UserDataTypes,
  AssetDataTypesWithStatus,
  IAssetStatus,
  IHashtag,
  IError,
  IMeta,
  IChainIdDecimalsFormat,
} from 'types'
export interface AssetsStateType {
  fetching: boolean
  fetchingAll: boolean
  error: IError
  assets: IUserAssets[] | null
  assetDetails: IAssetDetails
  exchangeRates?: IExchangeRates[]
  hashtags?: IHashtag[]
  isBidded?: boolean[]
  meta: IMeta
  total: number
}

export type IUserAssets = AssetDataTypesWithStatus & {
  hashtag: IHashtag[]
  _status?: IAssetStatus
  chain_id: number
}
export interface IAssetDetails {
  status?: IAssetStatus
  imageData: null | AssetDataTypes['imageData']
  tokenData: null | AssetTypes
  ownerData: null | UserDataTypes
  creatorData: null | UserDataTypes
  marketData: null | AssetMarketplaceTypes
  chain_id: number
}

export interface IExchangeRates {
  id: string
  rateUsd: number
  symbol: string
}
