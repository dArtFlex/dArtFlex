export interface IPopoverLinksProps {
  anchor: HTMLElement | null
  setAnchor: (target: null) => void
  links: ILinks[]
  subLinks?: ILinks[]
}

export interface ILinks {
  lable: string
  icon?: JSX.Element
  onClick: () => void
}

export interface IButtonLink extends ILinks {
  subLinks?: boolean
}
