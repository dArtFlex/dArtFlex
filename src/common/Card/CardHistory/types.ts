import { IBidsHistory, UserDataTypes } from 'types'

export interface ICardHistoryProps extends IBidsHistory {
  userData: UserDataTypes
  bidAmountToToken: number
  bidAmountUsd: string
  userWalletId?: number
  onAccept?: () => void
  onCancel?: ({ id }: { id: number }) => void
  expireDate: Date
  sales_token_contract: string
  contract: string
}

export interface ICardContainerProps {
  avatar: JSX.Element
  action: JSX.Element | null
  subheader: JSX.Element
  title: string
  children?: JSX.Element
}
