export interface BuyNowStateType {
  fetching: boolean
  fetchingTransacting: boolean
  error: string
  buyItemId?: number
  transactionHash: string
}
