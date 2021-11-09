import { IDatedTimeEntity } from 'types'
export interface ISellArtwork {
  price: string | number
  minimumBid: string | number
  reservePrice: string | number
  startingPrice: string
  fee: string
  futureTime: string
  expirationTime: string
  startDate: IDatedTimeEntity['start_time']
  endDate: IDatedTimeEntity['end_time']
  isEndingPrice: boolean
  isFutureTime: boolean
  salesTokenContract: string
}
