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
