import { IError } from 'types'
export interface BuyNowStateType {
  fetching: boolean
  fetchingTransacting: boolean
  error: IError
  buyItemId?: number
  transactionHash: string
}
