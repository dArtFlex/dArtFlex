export interface ISellArtworkProps {}

export interface ISellArtwork {
  price: number
  minimumBid: number
  endingPrice: number
  startingPrice: number
  reservePrice: number
  refferalBounty: number
  futureTime: string
  startDate: string
  buyerAddress: string
  isEndingPrice: boolean
  isFutureTime: boolean
  isPrivacy: boolean
}
