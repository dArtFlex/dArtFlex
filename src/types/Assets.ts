export interface AssetTypes {
  id: number
  contract: string
  tokenId: string
  uri: string
  creator: number
  owner: number
  royalty: number
  royaltyFee: number
  lazymint: boolean
  signature: string
}

export interface AssetDataTypes extends AssetTypes, AdditionalEntities {
  data: {
    attribute: string
    created_at: string
    description: string
    id: number
    image: string
    image_data: string
    name: string
    updated_at: string
  }
}

export type AssetStatus =
  | 'auction'
  | 'buy_now'
  | 'reserve_not_met'
  | 'reserve_price'
  | 'sold'
  | 'minted'
  | 'collected'
  | 'unlisted'
  | 'created'

// Todo: Should be discuss with BE all below entities
export interface AdditionalEntities {
  _status: AssetStatus
  _sold?: number
  _price?: number
  _priceReserve?: number
  _currentBit?: number
  _expPeriod?: number
}
