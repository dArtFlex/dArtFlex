export interface IPopoverLinksProps {
  anchor: HTMLElement | null
  setAnchor: (target: null) => void
  links: {
    lable: string
    icon?: JSX.Element
    onClick: () => void
  }[]
  subLinks?: {
    lable: string
    icon?: JSX.Element
    onClick: () => void
  }[]
}
