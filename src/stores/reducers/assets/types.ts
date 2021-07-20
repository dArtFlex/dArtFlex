import {
  AssetDataTypes,
  AssetTypes,
  AssetMarketplaceTypes,
  UserDataTypes,
  AssetDataTypesWithStatus,
  IAssetStatus,
} from 'types'
export interface AssetsStateType {
  fetching: boolean
  error: string
  assets: null | AssetDataTypesWithStatus[]
  assetDetails: IAssetDetails
  exchangeRates?: IExchangeRates[]
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
