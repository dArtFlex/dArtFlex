import { IAssetType, IAssetStatus, AssetDataTypes, AssetDataTypesWithStatus } from 'types'
import appConst from 'config/consts'

const {
  FILTER_VALUES: { LIVE_AUCTION, MINTED, BUY_NOW, RESERVE_NOT_MET, COLLECTED, CREATED, SOLD },
} = appConst

export interface ICardActionsProps extends Pick<ICardAssetProps, 'useCardStatus' | 'button'> {
  userWallet?: string
  ownerWallet: string
  status: IAssetStatus
  type: IAssetType
  startPrice?: AssetDataTypes['start_price']
  endPrice?: AssetDataTypes['end_price']
  currentPrice?: AssetDataTypes['current_price']
  sold?: AssetDataTypes['sold']
  endTime?: AssetDataTypes['end_time']
  burnTime?: number
  timer?: string
  onAction?: () => void
  emptyBottom?: boolean
  sales_token_contract: string
  tokenSymbol: string
}

export type ICardBadgeProps = Pick<ICardActionsProps, 'status' | 'sold'>

export interface IUseCardStatus {
  type: AssetDataTypes['type']
  status: IAssetStatus
  endPrice?: AssetDataTypes['end_price']
  startPrice?: AssetDataTypes['start_price']
  sold?: AssetDataTypes['sold']
  endTime?: AssetDataTypes['end_time'] | 0
}
export interface ICardAssetProps {
  asset: AssetDataTypesWithStatus
  withLabel?: boolean
  withAction?: boolean
  userWallet?: string
  emptyBottom?: boolean
  button?: {
    onListed?: () => void
    onSell?: () => void
    acceptOffer?: () => void
    acceptBid?: () => void
  }
  menu?: {
    onUnlisted?: () => void
  }
  useCardStatus?: (
    data: IUseCardStatus
  ) =>
    | typeof LIVE_AUCTION
    | typeof MINTED
    | typeof BUY_NOW
    | typeof RESERVE_NOT_MET
    | typeof COLLECTED
    | typeof CREATED
    | typeof SOLD
}
