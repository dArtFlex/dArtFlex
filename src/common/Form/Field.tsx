import React from 'react'
import { TextFieldProps } from '@material-ui/core'
import { Field as FormikField } from 'formik'
import FormUploadInput from './controls/Upload'
import FormTextInput from './controls/Input'
import { FieldRenderProps, ITextInput, IUploadInput } from './types'
import { FieldInputProps } from 'formik/dist/types'

export type FieldType = 'input' | 'upload'

export type IFieldProps = TextFieldProps &
  ITextInput &
  IUploadInput & {
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
            return <FormUploadInput form={form} field={field as FieldInputProps<string>} {...rest} />
          }
          case 'input': {
            return <FormTextInput form={form} field={field as FieldInputProps<string>} {...rest} />
          }
          default: {
            return null
          }
        }
      }}
    </FormikField>
  )
}
