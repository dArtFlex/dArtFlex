import { IDatedTimeEntity } from 'types'
export interface ISellArtwork {
  price: string
  minimumBid: string
  startingPrice: string
  reservePrice: string
  fee: string
  futureTime: string
  expirationTime: string
  startDate: IDatedTimeEntity['start_time']
  endDate: IDatedTimeEntity['end_time']
  isEndingPrice: boolean
  isFutureTime: boolean
}
