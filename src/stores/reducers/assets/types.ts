import { AssetDataTypes, AssetTypes, AssetMarketplaceTypes, UserDataTypes, AssetDataTypesWithStatus } from 'types'
export interface AssetsStateType {
  fetching: boolean
  error: string
  assets: null | AssetDataTypesWithStatus[]
  assetDetails: IAssetDetails
}

export interface IAssetDetails {
  imageData: null | AssetDataTypes['imageData']
  tokenData: null | AssetTypes
  ownerData: null | UserDataTypes
  creatorData: null | UserDataTypes
  marketData: null | AssetMarketplaceTypes
}
