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
