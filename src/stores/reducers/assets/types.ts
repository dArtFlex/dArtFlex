import { WyvernSchemaName } from 'opensea-js/lib/types'

export interface AssetsStateType {
  fetching: boolean
  error: string
  assets: Asset[] | null
}

export interface Asset {
  name: string
  image: string
  tokenId: string
  description: string | null
  external_link: string | null
  animation_url: string | null
  asset: {}
}
