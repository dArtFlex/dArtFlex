import appConsts from 'config/consts'

const {
  FILTER_VALUES: { LIVE_AUCTION },
} = appConsts

export type IBidStatus = typeof LIVE_AUCTION

export interface IBids {
  tokenId: string
  image: string
  name: string
  status: IBidStatus
  endDate: number // as timestamp
  creator: {
    avatar: string
    name: string
  }
  currentBid: number | null
  currentBidUsd: number | null
  yourBid: number | null
  yourBidUsd: number | null
}
