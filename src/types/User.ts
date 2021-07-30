import { IEntity, IDatedEntity } from 'types'
import appConst from 'config/consts'

export interface UserDataTypes extends IEntity, IDatedEntity, ISocial {
  fullname: string
  userid: string
  email: string
  wallet: string
  overview: string
  profile_image: string
  cover_image: string
  ban: boolean
}

interface ISocial {
  role: null
  website: string
  twitter: string
  instagram: string
  discord: string
  facebook: string
  youtube: string
  tiktok: string
  other_url: string
}

export type IUserRole = 'ROLE_SUPER_ADMIN' | 'ROLE_COMMON'

export interface IAddPromotionEntities {
  message: string
  id: number[]
}

export interface IPromotionId {
  created_at: string
  id: number
  item_id: string
  updated_at: string
}

export interface ITradingHistory extends IDatedEntity, IEntity {
  from: string
  to: string
  item_id: string
  market_id: string
  order_id: string
  bid_id: string
  bid_amount: string
  sales_token_contract: string
  status: 'minted' | 'listed' | 'bidded' | 'canceled' | 'transferred' | 'sold'
}

export interface IComposeHistory {
  history: ITradingHistory[]
  type: 'owner' | 'buyer'
}
