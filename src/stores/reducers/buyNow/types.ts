// import { IBidsHistory, UserDataTypes, IAcceptBidTransaction } from 'types'

export interface BuyNowStateType {
  fetching: boolean
  transacting: boolean
  error: string
  buyItemId?: number
}
