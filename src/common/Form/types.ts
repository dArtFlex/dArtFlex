import React from 'react'
import { FieldInputProps, FormikProps } from 'formik/dist/types'
import { CheckboxProps, FormControlLabelProps } from '@material-ui/core'

export type FieldRenderProps<Field = unknown, Form = unknown> = {
  form: FormikProps<Form>
  field: FieldInputProps<Field>
}

export interface ITextInput {
  description?: string
}

export interface IUploadInput extends ITextInput {
  helperText?: React.ReactNode
  cover?: boolean
}

export type IFormCheckboxProps = Omit<CheckboxProps, 'form'> & {
  label?: FormControlLabelProps | string
  asSwitch?: boolean
  helperText?: React.ReactNode
  fullWidth?: boolean
}

export type IFormSwitchProps = IFormCheckboxProps

export interface IFormAutocompleteProps {
  withClearOnBlur?: boolean
  withMultiple?: boolean
  witChips?: boolean
}

export interface IBaseSliderProps {
  defaultValue?: number
  min?: number
  max?: number
}
