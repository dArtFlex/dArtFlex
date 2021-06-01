export interface ITradingHistory {
  action: string
  token: {
    tokenId: string
    name: string
    image: string
  }
  cancelBid?: () => void
}
