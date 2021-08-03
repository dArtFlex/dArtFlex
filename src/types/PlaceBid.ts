export interface IBidsHistory {
  bid_amount: string
  created_at: Date | string
  id: number
  item_id: string
  market_id: string
  order_id: string
  bid_id: string
  status: HistoryStatusType
  updated_at: Date | string
  user_id: string
  tx_hash: string
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
