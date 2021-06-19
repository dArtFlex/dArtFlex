export * from './LazyMint'
export * from './Listing'
export * from './Assets'
export * from './User'

export interface IEntity {
  id: number
}
export interface IDatedEntity {
  created_at: string // ISO date
  updated_at: string // ISO date
}

export interface IDatedTimeEntity {
  start_time: string // ISO date
  end_time: string // ISO date
}

export interface IPriceEntity {
  start_price: string
  end_price: string
}
export interface IImageEntity extends IDatedEntity, IEntity {
  image: string
  image_data: string
  name: string
}

export type AssetType =
  | 'auction'
  | 'instant_buy'
  | 'reserve_not_met'
  | 'reserve_price'
  | 'sold'
  | 'minted'
  | 'collected'
  | 'unlisted'
  | 'created'
