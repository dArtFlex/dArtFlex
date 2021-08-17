import { IBidsHistory, UserDataTypes, IAcceptBidTransaction, IBids, IError } from 'types'
export interface PlaceBidStateType {
  fetching: boolean
  transacting: boolean
  error: IError
  data: unknown | null
  bidAmount: number | null
  bidHistory: Array<IBidsHistory & { userData: UserDataTypes }>
  bids?: IBids[]
  acceptBidTransaction?: IAcceptBidTransaction
}
