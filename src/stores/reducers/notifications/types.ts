import { INotifications } from 'types'

export interface NotificationsStateType {
  fetching: boolean
  transacting: boolean
  error: string
  notifications: INotifications[]
  bids: number
}
