import { IAccountSettings } from 'pages/AccountSettings/types'

export function setDummyAccount(): IAccountSettings {
  return {
    fullname: ' ',
    id: '',
    email: ' ',
    wallet: ' ',
    overview: ' ',
    profile_image: 'blank',
    cover_image: 'blank',
    created_at: '',
    updated_at: '',
    role: '',
    ban: false,
    website: '',
    twitter: '',
    instagram: '',
    discord: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    other_url: '',
  }
}
