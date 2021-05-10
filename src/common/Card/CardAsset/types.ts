import appConst from 'config/consts'

const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, MINTED, UNLISTED, COLLECTED, CREATED },
} = appConst

export interface ICardAssetProps {
  asset: any
  withLabel?: boolean
}

type UserResponse =
  | typeof LIVE_AUCTION
  | typeof BUY_NOW
  | typeof RESERVE_NOT_MET
  | typeof SOLD
  | typeof MINTED
  | typeof UNLISTED
  | typeof COLLECTED
  | typeof CREATED

export interface ICardActionsProps {
  status: UserResponse
  onAction?: () => void
  currentBit?: number
  priceReserve?: number
  expPeriod?: number
  burnTime?: number
  timer?: string
  price?: number
  sold?: number
}

export interface ICardBadgeProps extends Pick<ICardActionsProps, 'status'> {}
