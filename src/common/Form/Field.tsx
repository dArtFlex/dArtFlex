import React from 'react'
import { TextFieldProps } from '@material-ui/core'
import { Field as FormikField } from 'formik'
import FormUploadInput from './controls/Upload'
import FormTextInput from './controls/Input'
import FormSwitchInput from './controls/Switch'
import { FieldRenderProps, ITextInput, IUploadInput, IFormSwitchProps } from './types'
import { FieldInputProps } from 'formik/dist/types'

export type FieldType = 'input' | 'upload' | 'switch'

export type IFieldProps = TextFieldProps &
  ITextInput &
  IUploadInput &
  IFormSwitchProps & {
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
            return <FormUploadInput form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'input': {
            return <FormTextInput form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'switch': {
            return <FormSwitchInput form={form} field={field as FieldInputProps<boolean>} name={name} {...rest} />
          }
          default: {
            return null
          }
        }
      }}
    </FormikField>
  )
}
