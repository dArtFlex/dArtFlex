import { AssetDataTypes, AssetTypes, AdditionalEntities } from 'types'
export interface AssetsStateType {
  fetching: boolean
  error: string
  assets: null | AssetDataTypes[]
  assetDetails: IAssetDetails
}

export interface IAssetDetails {
  imageData: null | AssetDataTypes['data']
  tokenData: null | AssetTypes
  infoData: null | AdditionalEntities
}
