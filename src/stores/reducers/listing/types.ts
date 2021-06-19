import { ListingData } from 'types'
export interface ListingStateType {
  fetching: boolean
  error: string
  data: ListingData
  orderId: null | number
  salesDetailId: null | number
  listItemId: null | number
  bidListItemId: null | number
  listing: 'none' | 'done'
}
