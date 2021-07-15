import { IBidsHistory, UserDataTypes } from 'types'

export interface ICardHistoryProps extends IBidsHistory {
  action?: () => void
  userData: UserDataTypes
  bidAmountToToken: string
  bidAmountUsd: string
  userWalletId?: number
}

export interface ICardContainerProps {
  avatar: JSX.Element
  action: JSX.Element
  subheader: JSX.Element
  title: string
  children?: JSX.Element
}
