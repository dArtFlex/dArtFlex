import { ListingData, IError } from 'types'
export interface ListingStateType {
  fetching: boolean
  fetchingDropPrice: boolean
  fetchingUnlist: boolean
  error: IError
  data: ListingData
  orderId: null | number
  salesDetailId: null | number
  listItemId: null | number
  bidListItemId: null | number
  listing: 'none' | 'done'
  priceChanged?: boolean
  artworkUnlisted?: boolean
}
