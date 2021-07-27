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
