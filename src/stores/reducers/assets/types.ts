import { WyvernSchemaName } from 'opensea-js/lib/types'

export interface AssetsStateType {
  fetching: boolean
  error: string
  assets: Asset[] | null
}

type assetStatus = 'auction' | 'buy_now' | 'reserve_price' | 'sold'

export interface Asset {
  name: string
  image: string
  tokenId: string
  description: string | null
  external_link: string | null
  animation_url: string | null
  currenBid: number
  creator: string
  ownedBy: string
  asset: {}
  _status?: assetStatus
  _sold?: number
  _price?: number
  _priceReserve?: number
  _currentBit?: number
  _expPeriod?: string
}
