import React from 'react'
import { TextFieldProps } from '@material-ui/core'
import { useFormikContext } from 'formik'
import FormControl from '../FormControl'
import { UploadFile } from 'common'
import { getFormikFieldError } from '../../lib'
import { FieldRenderProps, IUploadInput } from '../../types'
import { useStyles } from './styles'

export type IFormUploadInputProps = Omit<TextFieldProps, 'variant'> & IUploadInput

export default function FormUploadInput(props: IFormUploadInputProps & FieldRenderProps<string>) {
  const classes = useStyles()
  const { form, field, helperText, className, fullWidth } = props
  const { errorText, hasError } = getFormikFieldError({ form, field })
  const { setFieldError, setFieldValue } = useFormikContext()

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      className={className}
      fullWidth={fullWidth}
    >
      <UploadFile
        {...field}
        customeraction={{ setFieldValue, setFieldError }}
        label="Upload..."
        variant="outlined"
        classNames={{ root: classes.uploadBtn }}
      />
    </FormControl>
  )
}
