import React from 'react'
import { FormControlLabel, Switch } from '@material-ui/core'
import { FieldRenderProps, IFormSwitchProps } from '../../types'
import { getFormikFieldError } from '../../lib'
import FormControl from '../FormControl'
import { useStyles } from './styles'

export default function FormSwitch(props: IFormSwitchProps & FieldRenderProps<boolean>) {
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
          <Switch
            {...field}
            {...rest}
            color={color}
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
          />
        }
      />
    </FormControl>
  )
}
