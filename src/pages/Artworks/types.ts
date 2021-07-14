import appConst from 'config/consts'
const { FILTER_VALUES } = appConst
export interface IPromotedArtwork {
  id: number
  author: IPromotedArtworkAuthor
  name: string
  bid: number
  endDate: number
  url: string
}

export interface IPromotedArtworkAuthor {
  id: number
  name: string
  profilePhoto: string
}

export interface IPromotion {
  artworks: IPromotedArtwork[]
}

export type IArtworksFiltes =
  | typeof FILTER_VALUES.LIVE_AUCTION
  | typeof FILTER_VALUES.BUY_NOW
  | typeof FILTER_VALUES.RESERVE_NOT_MET
  | typeof FILTER_VALUES.SOLD
  | typeof FILTER_VALUES.FEATURED_ARTWORKS
