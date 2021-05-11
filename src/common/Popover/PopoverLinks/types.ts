export interface IPopoverLinksProps {
  anchor: HTMLElement | null
  setAnchor: (target: null) => void
  links: ILinks[]
  subLinks?: ILinks[]
  title?: JSX.Element | null
  subTitle?: JSX.Element | null
}

export interface ILinks {
  lable: string
  icon?: JSX.Element
  onClick: () => void
}

export interface IButtonLink extends ILinks {
  subLinks?: boolean
}
