import { IBaseSliderProps } from '../Form/types'

export interface ISliderProps extends IBaseSliderProps {
  value: number
  onChange: (event: any, newValue: number | number[]) => void
}
