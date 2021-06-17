import { IBids } from '../../types'

export interface ICardBidProps {
  bid: IBids
}

export interface IBidsProps {
  title: string
  bidAmount: number
  bidAmountUsd: number
}
