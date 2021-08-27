import { IDatedEntity, IEntity } from 'types'
export interface INotifications extends IEntity {
  message: string
  updated_at: string
  item_id: string
  image: string
  read: boolean
}

export interface ISocketDataNotification extends IDatedEntity, IEntity {
  message: string
  activity_id: number
  bid_amount: string
  bid_id: string
  from: string
  item_id: string
  market_id: string
  order_id: string
  read: boolean
  sales_token_contract: string
  status: INotificationStatus
  to: string
  tx_hash: null | string
}

type INotificationStatus = 'bidded'
