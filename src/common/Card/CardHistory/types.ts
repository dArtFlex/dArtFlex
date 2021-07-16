import { IBidsHistory, UserDataTypes } from 'types'

export interface ICardHistoryProps extends IBidsHistory {
  userData: UserDataTypes
  bidAmountToToken: string
  bidAmountUsd: string
  userWalletId?: number
  onAccept?: () => void
  onCancel?: () => void
}

export interface ICardContainerProps {
  avatar: JSX.Element
  action: JSX.Element
  subheader: JSX.Element
  title: string
  children?: JSX.Element
}
