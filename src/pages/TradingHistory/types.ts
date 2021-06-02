import appConst from 'config/consts'

const {
  FILTER_VALUES: { OWNED, SOLD, TRANSFERRED, CANCELED_BID, BID_PLACED, LISTED, MINTED },
} = appConst

export type IActionType =
  | typeof OWNED
  | typeof SOLD
  | typeof TRANSFERRED
  | typeof CANCELED_BID
  | typeof BID_PLACED
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
}
