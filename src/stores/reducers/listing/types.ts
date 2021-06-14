export interface ListingStateType {
  fetching: boolean
  error: string
  data: {
    type: IListingType
    startPrice: string
    endPrice: string
    startTime: string
    endTime: string
    salesTokenContract: string
    platfromFee: string
  }
}

export type IListingType = 'auction' | 'instant_buy'
