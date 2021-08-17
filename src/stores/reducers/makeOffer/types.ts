import { IError } from 'types'
export interface MakeOfferStateType {
  fetching: boolean
  error: IError
  offerId?: number
}
