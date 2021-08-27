import { IAccountSettings } from 'pages/AccountSettings/types'
import cover_1 from 'common/icons/cover_1.png'
import cover_2 from 'common/icons/cover_2.png'
import cover_3 from 'common/icons/cover_3.png'
import cover_4 from 'common/icons/cover_4.png'
import cover_5 from 'common/icons/cover_5.png'
import cover_6 from 'common/icons/cover_6.png'
import cover_7 from 'common/icons/cover_7.png'
import cover_8 from 'common/icons/cover_8.png'
import avatar_1 from 'common/icons/avatar_1.png'
import avatar_2 from 'common/icons/avatar_2.png'
import avatar_3 from 'common/icons/avatar_3.png'
import avatar_4 from 'common/icons/avatar_4.png'
import avatar_5 from 'common/icons/avatar_5.png'

export function setDummyAccount(): IAccountSettings {
  return {
    fullname: '',
    id: '',
    email: '',
    wallet: ' ',
    overview: ' ',
    profile_image: setRandomAvatar(),
    cover_image: setRandomCover(),
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

export function setRandomAvatar() {
  const avatars = [avatar_1, avatar_2, avatar_3, avatar_4, avatar_5]
  const avatar = avatars[Math.floor(Math.random() * avatars.length)]
  return avatar
}

export function setRandomCover() {
  const covers = [cover_1, cover_2, cover_3, cover_4, cover_5, cover_6, cover_7, cover_8]
  const cover = covers[Math.floor(Math.random() * covers.length)]
  return cover
}
