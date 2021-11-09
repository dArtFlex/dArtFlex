import { IAssetStatus } from 'types'
export interface IPromotedArtwork {
  id: number
  author: IPromotedArtworkAuthor
  name: string
  bid: number
  endDate: number
  url: string
  tokenContractAddress: string
  contract: string
  type: IAssetStatus
}

export interface IPromotedArtworkAuthor {
  id: number
  name: string
  profilePhoto: string
}

export interface IPromotion {
  artworks: IPromotedArtwork[]
}
