export interface ICardHistoryProps {
  user?: string
  title: string
  expDate?: string
  src: string
  action?: () => void
  status: HistoryStatusType
}

type HistoryStatusType = 'owend' | 'transferred' | 'sold' | 'minted' | 'logged' | 'listed' | 'canceled'

export interface ICardContainerProps {
  avatar: JSX.Element
  action: JSX.Element
  subheader: JSX.Element
  title: string
  children?: JSX.Element
}
