import {
  AssetDataTypes,
  AssetTypes,
  AssetMarketplaceTypes,
  UserDataTypes,
  AssetDataTypesWithStatus,
  IAssetStatus,
  IHashtag,
  IError,
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
}

export type IUserAssets = AssetDataTypesWithStatus & { hashtag: IHashtag[] }
export interface IAssetDetails {
  status?: IAssetStatus
  imageData: null | AssetDataTypes['imageData']
  tokenData: null | AssetTypes
  ownerData: null | UserDataTypes
  creatorData: null | UserDataTypes
  marketData: null | AssetMarketplaceTypes
}

export interface IExchangeRates {
  id: string
  rateUsd: number
  symbol: string
}
