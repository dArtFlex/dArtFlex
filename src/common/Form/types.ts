import React from 'react'
import { FieldInputProps, FormikProps } from 'formik/dist/types'
import { CheckboxProps, FormControlLabelProps } from '@material-ui/core'

export type FieldRenderProps<Field = unknown, Form = unknown> = {
  form: FormikProps<Form>
  field: FieldInputProps<Field>
}

export interface IBaseFormFieldProps {
  name?: string
  label?: FormControlLabelProps | string
  asSwitch?: boolean
  helperText?: React.ReactNode
  fullWidth?: boolean
  className?: string
  required?: boolean
}

export interface ITextInput {
  description?: string
  typeValue?: 'number' | 'string'
}

export interface IUploadInput extends Pick<IBaseFormFieldProps, 'helperText'> {
  cover?: boolean
}

export type IFormCheckboxProps = Omit<CheckboxProps, 'form'> & IBaseFormFieldProps
export type IFormSwitchProps = IFormCheckboxProps

export interface IFormAutocompleteProps {
  withClearOnBlur?: boolean
  withMultiple?: boolean
  witChips?: boolean
  onCreate?: (value: string) => void
}

export interface IBaseSliderProps extends IBaseFormFieldProps {
  defaultValue?: number
  min?: number
  max?: number
}
