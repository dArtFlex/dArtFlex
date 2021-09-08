export interface IBidsHistory {
  bid_amount: string
  id: number
  item_id: string
  market_id: string
  order_id: string
  bid_id: string
  status: HistoryStatusType
  created_at: Date | string
  updated_at: Date | string
  user_id: string
  tx_hash: string
}

export interface IBidsMarketHistory extends Pick<IBidsHistory, 'item_id' | 'user_id' | 'market_id' | 'bid_amount'> {
  status: HistoryStatusType
  order_id: number
}

export type IOrderHistory = Omit<IBidsHistory, 'bid_id' & 'tx_hash'>
export interface IBids extends Omit<IBidsHistory, 'tx_hash' | 'bid_id' | 'id'> {
  id: IBidsHistory['bid_id']
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
  | 'bidded'
  | 'purchased'
  | 'offered'
  | 'accepted'
  | 'canceled offer'

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
  signatureOrder?: string
}

export interface IAcceptBidTransaction {
  blockHash: string
  blockNumber: number
  contractAddress: null | string
  cumulativeGasUsed: number
  effectiveGasPrice: string
  from: string
  gasUsed: number
  logs: unknown[]
  logsBloom: string
  status: boolean
  to: string
  transactionHash: string
  transactionIndex: number
  type: string
}
