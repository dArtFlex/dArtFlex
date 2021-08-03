export interface IAccountSettings extends ISocials {
  fullname: string
  id: string
  email: string
  wallet: string
  overview: string
  profile_image: null | File | string
  cover_image: null | File | string
  created_at: string
  updated_at: string
  role: string | null
  ban: boolean
}

export interface ISocials {
  website: string
  twitter: string
  instagram: string
  discord: string
  facebook: string
  youtube: string
  tiktok: string
  other_url: string
}
