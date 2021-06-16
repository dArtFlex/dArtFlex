export type ListingType = 'auction' | 'instant_buy'

export interface ListingData {
  type: ListingType
  startPrice: string
  endPrice: string
  startTime: string
  endTime: string
  salesTokenContract: string
  platfromFee: string
}
