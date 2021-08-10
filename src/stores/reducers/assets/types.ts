import {
  AssetDataTypes,
  AssetTypes,
  AssetMarketplaceTypes,
  UserDataTypes,
  AssetDataTypesWithStatus,
  IAssetStatus,
  IHashtag,
} from 'types'
export interface AssetsStateType {
  fetching: boolean
  fetchingAll: boolean
  error: string
  assets: null | Array<AssetDataTypesWithStatus & { hashtag: IHashtag[] }>
  assetDetails: IAssetDetails
  exchangeRates?: IExchangeRates[]
  hashtags?: IHashtag[]
}

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
