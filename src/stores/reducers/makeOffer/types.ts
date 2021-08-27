import { IError, IAcceptBidTransaction } from 'types'
export interface MakeOfferStateType {
  fetching: boolean
  error: IError
  offerId?: number
  success: string
  acceptOfferTransaction?: IAcceptBidTransaction
}
