import appConsts from 'config/consts'

const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, OWNED },
} = appConsts

export type IBidStatus = typeof LIVE_AUCTION | typeof BUY_NOW | typeof OWNED

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
