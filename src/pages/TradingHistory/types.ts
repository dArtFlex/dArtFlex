import appConst from 'config/consts'

const {
  FILTER_VALUES: { OWNED, SOLD, TRANSFERRED, CANCELED_BID, PLACED_BID, LISTED, MINTED },
} = appConst

export type IActionType =
  | typeof OWNED
  | typeof SOLD
  | typeof TRANSFERRED
  | typeof CANCELED_BID
  | typeof PLACED_BID
  | typeof LISTED
  | typeof MINTED

export interface ITradingHistory {
  action: IActionType
  token: {
    tokenId: string
    name: string
    image: string
  }
  from: string
  to: string
  date: string
  expDate: string
  amount: string
  cancelBid?: () => void
  etherscanLink: string
  txHash?: string
  status: string
  order_id: string
  bid_id: string
  isLastActionOnItem?: boolean
}

export interface ITradingHistoryFilter {
  label: string
  name: IFilterTypes
  checked: boolean
}

export type IFilterTypes = 'minted' | 'listed' | 'bidded' | 'sold' | 'purchased'
