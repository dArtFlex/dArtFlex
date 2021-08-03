import { SelectProps } from '@material-ui/core'
import { FieldRenderProps, IBaseFormFieldProps } from '../../types'

export interface IOptionsType {
  value: number
  label: string
  title: string
  inputValue: string
}

export type IFormAutocompleteProps = SelectProps &
  Pick<IBaseFormFieldProps, 'helperText'> & {
    options?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    extractId?: (option: IOptionsType) => number | string
    extractValue?: (option: IOptionsType) => number | string
    extractOption?: (item: IOptionsType) => string
    withClearOnBlur?: boolean
    withMultiple?: boolean
    witChips?: boolean
    onCreate?: (value: string) => void
  }

export type IBaseFormAutocompleteProps = IFormAutocompleteProps & FieldRenderProps<string>
