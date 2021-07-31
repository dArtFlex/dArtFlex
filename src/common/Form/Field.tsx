import React from 'react'
import { TextFieldProps } from '@material-ui/core'
import { Field as FormikField } from 'formik'
import FormUpload from './controls/Upload'
import FormTextInput from './controls/Input'
import FormSwitch from './controls/Switch'
import FormCheckbox from './controls/Checkbox'
import FormSelect, { IFormSelectProps } from './controls/Select'
import FormDateTimePicker from './controls/DatePicker/DateTimePicker'
import Autocomplete from './controls/Autocomplete'
import FormDatePicker from './controls/DatePicker'
import Slider from './controls/Slider'
import { IFormDatePickerProps } from './controls/DatePicker/types'
import {
  FieldRenderProps,
  ITextInput,
  IUploadInput,
  IFormSwitchProps,
  IFormCheckboxProps,
  IFormAutocompleteProps,
  IBaseSliderProps,
} from './types'
import { FieldInputProps } from 'formik/dist/types'

export type FieldType =
  | 'input'
  | 'upload'
  | 'switch'
  | 'select'
  | 'picker'
  | 'pickerTime'
  | 'checkbox'
  | 'autocomplete'
  | 'slider'

export type IFieldProps = IFormSelectProps &
  ITextInput &
  IUploadInput &
  TextFieldProps &
  IFormSwitchProps &
  IFormCheckboxProps &
  IFormAutocompleteProps &
  IBaseSliderProps &
  IFormDatePickerProps & {
    name: string
    type: FieldType
  }

export default function Field(props: IFieldProps) {
  const { name, type, ...rest } = props

  return (
    <FormikField key={name} name={name}>
      {({ form, field }: FieldRenderProps) => {
        switch (type) {
          case 'upload': {
            return <FormUpload form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'input': {
            return <FormTextInput form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'switch': {
            return <FormSwitch form={form} field={field as FieldInputProps<boolean>} name={name} {...rest} />
          }
          case 'checkbox': {
            return <FormCheckbox form={form} field={field as FieldInputProps<boolean>} name={name} {...rest} />
          }
          case 'select': {
            return <FormSelect form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'picker': {
            return <FormDatePicker form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'pickerTime': {
            return <FormDateTimePicker form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'autocomplete': {
            return <Autocomplete form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'slider': {
            return <Slider form={form} field={field as FieldInputProps<boolean>} name={name} {...rest} />
          }
          default: {
            return null
          }
        }
      }}
    </FormikField>
  )
}
