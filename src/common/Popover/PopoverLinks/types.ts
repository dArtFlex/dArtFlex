import { ILink } from 'types'

export interface IPopoverLinksProps {
  anchor?: HTMLElement | null
  setAnchor?: (target: null) => void
  links: ILink[]
  subLinks?: ILink[]
  title?: JSX.Element | null
  subTitle?: JSX.Element | null
  isMobile?: boolean
}

export interface IButtonLink extends ILink {
  subLinks?: boolean
  isMobile?: boolean
}
