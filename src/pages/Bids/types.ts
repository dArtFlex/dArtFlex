import appConsts from 'config/consts'

const {
  FILTER_VALUES: { LIVE_AUCTION },
} = appConsts

export type IBidStatus = typeof LIVE_AUCTION

export interface IBids {
  itemId: string | number
  tokenId: string | number
  image: string
  name: string
  status?: IBidStatus
  endDate: string
  creator: {
    avatar: string
    name: string
  }
  currentBid: string
  currentBidUsd: string
  yourBid: string
  yourBidUsd: string
}
