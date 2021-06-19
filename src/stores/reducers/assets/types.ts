import { AssetDataTypes, AssetTypes, AssetMarketplaceTypes, UserDataTypes } from 'types'
export interface AssetsStateType {
  fetching: boolean
  error: string
  assets: null | AssetDataTypes[]
  assetDetails: IAssetDetails
}

export interface IAssetDetails {
  imageData: null | AssetDataTypes['imageData']
  tokenData: null | AssetTypes
  ownerData: null | UserDataTypes
  marketData: null | AssetMarketplaceTypes
}
