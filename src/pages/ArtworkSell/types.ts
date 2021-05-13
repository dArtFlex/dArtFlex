export interface ISellArtworkProps {}

export interface ISellArtwork {
  price: number
  minimumBid: number
  reservePrice: number
  refferalBounty: null | number
  futureDate: string
  startDate: string
  buyerAddress: string
  endingPrice: boolean
  futureTime: boolean
  privacy: boolean
}
