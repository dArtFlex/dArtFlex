import { IAccountSettings } from 'pages/AccountSettings/types'
import image from 'common/icons/smiley_face.svg'
import cover from 'common/icons/cover-default.svg'

export function setDummyAccount(): IAccountSettings {
  return {
    fullname: 'unfilled',
    id: '',
    email: 'unfilled',
    wallet: 'unfilled',
    overview: 'unfilled',
    profile_image: image,
    cover_image: cover,
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
