import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { FieldRenderProps, IFormCheckboxProps } from '../../types'
import { getFormikFieldError } from '../../lib'
import FormControl from '../FormControl'
import { useStyles } from './styles'

export default function FormSwitch(props: IFormCheckboxProps & FieldRenderProps<boolean>) {
  const classes = useStyles()

  const { form, field, label, color = 'primary', className, helperText, fullWidth, ...rest } = props
  const { errorText, hasError } = getFormikFieldError({ form, field })

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      gap={false}
      fullWidth={fullWidth}
      className={className}
    >
      <FormControlLabel
        label={label}
        classes={{ label: classes.label, root: classes.rootControl }}
        control={
          <Checkbox
            {...field}
            {...rest}
            color={color}
            classes={{
              root: classes.root,
              checked: classes.checked,
              disabled: classes.disabled,
            }}
          />
        }
      />
    </FormControl>
  )
}
