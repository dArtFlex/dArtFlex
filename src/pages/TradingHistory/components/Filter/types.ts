import { IFilterTypes } from '../../types'

export interface IFilterProps {
  onFilter: (filters: Array<IFilterTypes>) => void
}
