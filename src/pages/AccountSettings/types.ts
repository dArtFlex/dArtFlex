export interface IAccountSettings extends ISocials {
  fullname: string
  userid: string
  email: string
  wallet: string
  overview: string
  profile_image: null | File
  cover_image: null | File
}

export interface ISocials {
  socials?: {
    website?: string
    twitter?: string
    instagram?: string
    discord?: string
    facebook?: string
    youtube?: string
    tiktok?: string
    other?: string
  }
}
