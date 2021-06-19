import { IEntity, IDatedEntity, IDatedTimeEntity, UserDataTypes, IPriceEntity, IImageEntity, AssetType } from 'types'

export interface AssetMarketplaceTypes extends IEntity, IDatedEntity, IDatedTimeEntity, IPriceEntity {
  item_id: string
  type: AssetType
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
}

export interface AssetDataTypes extends AssetMarketplaceTypes {
  imageData: IImageData
  userData: UserDataTypes
}

export interface IImageData extends IImageEntity {
  attribute: string
  description: string
}
