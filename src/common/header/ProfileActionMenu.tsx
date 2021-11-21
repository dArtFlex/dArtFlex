import React from 'react'
import { PopoverLinks } from 'common'
import { ILink } from 'types'
interface IProfileActionMenuProps {
  anchor?: null | HTMLElement
  setAnchor?: (target: null) => void
  isMobile?: boolean
  links: ILink[]
  subLinks: ILink[]
}

export default function ProfileActionMenu(props: IProfileActionMenuProps) {
  const { anchor, setAnchor, isMobile, links, subLinks } = props

  return <PopoverLinks anchor={anchor} setAnchor={setAnchor} links={links} isMobile={isMobile} subLinks={subLinks} />
}
