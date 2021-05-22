import React from 'react'
import clsx from 'clsx'
import { TextField, TextFieldProps, Typography } from '@material-ui/core'
import FormControl from '../FormControl'
import { getFormikFieldError } from '../../lib'
import { FieldRenderProps, ITextInput } from '../../types'
import { useStyles } from './styles'

export type IFormTextInputProps = TextFieldProps &
  ITextInput & {
    shrink?: boolean
    helperText?: React.ReactNode
  }

export default function FormTextInput(props: IFormTextInputProps & FieldRenderProps<string>) {
  const classes = useStyles()
  const {
    form,
    field,
    helperText,
    variant,
    required,
    label,
    shrink,
    InputProps,
    description,
    fullWidth,
    className,
    ...rest
  } = props
  const { errorText, hasError } = getFormikFieldError({ form, field })
  const { multiline } = rest

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      className={className}
      fullWidth={fullWidth}
    >
      {label && (
        <Typography className={clsx(classes.label, required && classes.star)} component="span">
          {label}
        </Typography>
      )}
      {description && <Typography className={classes.description}>{description}</Typography>}
      <TextField
        {...field}
        {...rest}
        variant={variant}
        InputProps={InputProps}
        InputLabelProps={{ shrink, classes: { root: classes.label } }}
        error={hasError}
      />
      {multiline && <Typography className={classes.counter}>0/200</Typography>}
    </FormControl>
  )
}
