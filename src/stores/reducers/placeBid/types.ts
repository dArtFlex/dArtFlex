export interface PlaceBidStateType {
  fetching: boolean
  error: string
  data: unknown | null
  bidAmount: number | null
  bidHistory: Array<any>
}
