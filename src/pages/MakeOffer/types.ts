import { Dispatch, SetStateAction } from 'react'

export interface IMakeOfferForm {
  formId: number
  setFormId: Dispatch<SetStateAction<number>>
}

export interface ITabPanelProps {
  children: JSX.Element
  index: number
  value: number
}

export interface IHistoryData {
  id: number
  avatar: string
  date: number
  bid: number
  author: string
  listed?: boolean
  minted?: boolean
  expiration?: number
}
