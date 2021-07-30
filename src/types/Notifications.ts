export interface INotifications {
  message: IMessageType
  updated_at: string
  item_id: string
  image: string
  status: boolean
}

export type IMessageType =
  | 'Artwork was sold'
  | 'Your Item has been bid'
  | 'The price was changed'
  | 'Your auction was ended'
  | 'Your bid  was outbid'
  | 'Please be informed about significant updates to your item'
