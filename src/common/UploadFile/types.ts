import { ButtonProps } from '@material-ui/core'

export interface IUploadFile {
  accept?: string | Array<string>
  maxSize?: number
  multiple?: boolean
  error?: string
  touched?: boolean
  value?: File | string
  helperText?: string
  label?: string
  classNames?: {
    root: string
  }
  variant?: Partial<ButtonProps['variant']>
  name?: string
  customeraction?: {
    // eslint-disable-next-line
    setFieldValue?: any
    // eslint-disable-next-line
    setFieldError?: any
    // eslint-disable-next-line
    setFieldTouched?: any
    // eslint-disable-next-line
    setFieldsArray?: any
  }
}
