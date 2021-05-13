import { ReactNode } from 'react'

import { KeyboardDatePickerProps } from '@material-ui/pickers/DatePicker'

import { ClassDictionary } from 'clsx'

export interface IFormDatePickerProps {
  label?: string
  disabled?: boolean
  inputVariant?: KeyboardDatePickerProps['inputVariant']
  className?: string
  variant?: string
  helperText?: ReactNode
  name: string
  fullWidth?: boolean
}

declare module '@material-ui/pickers/DatePicker/DatePicker' {
  interface BaseDatePickerProps {
    classes: ClassDictionary
  }
}
