import { FieldInputProps, FormikProps } from 'formik/dist/types'

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
