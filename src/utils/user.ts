import { IAccountSettings } from 'pages/AccountSettings/types'
import { v4 as uuidv4 } from 'uuid'

export function setDummyAccount(): IAccountSettings {
  return {
    fullname: ' ',
    id: '',
    email: `${uuidv4().slice(0, 12)}@gmail.com`,
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
