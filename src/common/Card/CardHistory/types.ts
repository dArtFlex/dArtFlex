export interface ICardHistory {
  user?: string
  title: string
  expDate?: string
  src: string
  cancelBid?: () => void
  status?: 'owend' | 'transferred' | 'sold' | 'minted' | 'logged' | 'listed' | 'canceled'
}

export interface ICardContainerProps {
  avatar: JSX.Element
  action: JSX.Element
  subheader: JSX.Element
  title: string
  children?: JSX.Element
}
