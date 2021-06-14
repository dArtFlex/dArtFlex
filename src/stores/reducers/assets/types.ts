import { AssetDataTypes } from 'types'
export interface AssetsStateType extends Asset {
  fetching: boolean
  error: string
}

export interface Asset {
  assets: Array<AssetDataTypes> | null
}
