import { AssetDataTypesWithStatus, AssetTypes } from 'types'
import appConst from 'config/consts'
const { FILTER_VALUES } = appConst

export interface ILinks {
  link: string
  icon: JSX.Element
  href: string
}

export type IDashboardArtworksFiltes =
  | typeof FILTER_VALUES.IN_WALLET
  | typeof FILTER_VALUES.CREATED
  | typeof FILTER_VALUES.COLLECTED
  | typeof FILTER_VALUES.SOLD

export type IUserAssets = AssetDataTypesWithStatus & {
  tokenData: AssetTypes
}
