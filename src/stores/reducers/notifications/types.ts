import { INotifications, IError } from 'types'

export interface NotificationsStateType {
  fetching: boolean
  transacting: boolean
  error: IError
  notifications: INotifications[]
  bids: number
}
