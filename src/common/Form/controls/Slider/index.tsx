import React from 'react'
import clsx from 'clsx'
import { useFormikContext } from 'formik'
import { Typography } from '@material-ui/core'
import { FieldRenderProps, IFormSwitchProps } from '../../types'
import { getFormikFieldError } from '../../lib'
import FormControl from '../FormControl'
import { Slider } from 'common'
import { useStyles } from './styles'

export default function FormSwitch(props: IFormSwitchProps & FieldRenderProps<boolean>) {
  const { form, field, label, className, helperText, fullWidth, required, ...rest } = props
  const classes = useStyles()
  const { errorText, hasError } = getFormikFieldError({ form, field })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>()

  const handleSliderChange = (event: unknown, newValue: number | number[]) => {
    setFieldValue(field.name, newValue)
  }

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      gap={false}
      fullWidth={fullWidth}
      className={clsx(className, classes.root)}
      {...rest}
    >
      {label && (
        <Typography className={clsx(classes.inputLabel, required && classes.star)} component="span">
          {label}
        </Typography>
      )}
      <Slider value={values[field.name]} onChange={handleSliderChange} />
    </FormControl>
  )
}
