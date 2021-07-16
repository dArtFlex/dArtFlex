export interface IBidsHistory {
  bid_amount: string
  created_at: Date | string
  id: number
  item_id: string
  market_id: string
  order_id: string
  status: HistoryStatusType
  updated_at: Date | string
  user_id: string
}

export type HistoryStatusType =
  | 'owend'
  | 'transferred'
  | 'sold'
  | 'minted'
  | 'logged'
  | 'listed'
  | 'canceled'
  | 'pending'

export interface IOrderData {
  data: string
  dataType: string
  maker: string
  makeAsset: {
    assetType: {
      assetClass: string
      data: string
    }
    value: string
  }
  taker: string
  takeAsset: {
    assetType: {
      assetClass: string
      data: string
    }
    value: string
  }
  start: string
  end: string
  salt: string
  signature: string
}
