import { SelectProps } from '@material-ui/core'
import { FieldRenderProps } from '../../types'

export interface IOptionsType {
  value: number
  label: string
}

export type IFormAutocompleteProps = SelectProps & {
  options?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  extractId?: (option: IOptionsType) => number | string
  extractValue?: (option: IOptionsType) => number | string
  extractLabel?: (item: IOptionsType) => string
  helperText?: React.ReactNode
  withClearOnBlur?: boolean
  withMultiple?: boolean
  witChips?: boolean
}

export type IBaseFormAutocompleteProps = IFormAutocompleteProps & FieldRenderProps<string>
