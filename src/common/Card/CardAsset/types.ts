import { IAssetType, IAssetStatus } from 'types'

export interface ICardAssetProps {
  asset: any
  withLabel?: boolean
  withAction?: boolean
}

export interface ICardActionsProps {
  status: IAssetStatus
  type: IAssetType
  onAction?: () => void
  currentBit?: number
  priceReserve?: number
  expPeriod?: number
  burnTime?: number
  timer?: string
  price?: number
  sold?: number
}

export type ICardBadgeProps = Pick<ICardActionsProps, 'status'>
