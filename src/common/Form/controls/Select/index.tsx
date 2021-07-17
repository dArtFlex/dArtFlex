import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { SelectProps, Select, InputLabel, MenuItem } from '@material-ui/core'
import FormControl from '../FormControl'
import { getFormikFieldError } from '../../lib'
import { FieldRenderProps } from '../../types'
import { useStyles } from './styles'

export interface IOptionsType {
  value: number
  label: string
}

export type IFormSelectProps = SelectProps & {
  shrink?: boolean
  helperText?: React.ReactNode
  options?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  extractId?: (option: IOptionsType) => number | string
  extractValue?: (option: IOptionsType) => number | string
  extractLabel?: (item: IOptionsType) => string
}

export default function FormSelect(props: IFormSelectProps & FieldRenderProps<string>) {
  const classes = useStyles()
  const {
    form,
    field,
    helperText,
    extractId = (option) => option.value,
    extractValue = (option) => option.value,
    extractLabel = (item) => item.label,
    options = [],
    variant = 'outlined',
    required, // eslint-disable-line @typescript-eslint/no-unused-vars
    label,
    shrink,
    fullWidth,
    className,
    ...rest
  } = props
  const { errorText, hasError } = getFormikFieldError({ form, field })

  const inputLabel = useRef<HTMLLabelElement>(null)
  const [labelWidth, setLabelWidth] = useState(0)

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth) // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }, [])

  const renderValue = (selected: unknown) =>
    extractLabel(options.find((item: IOptionsType) => extractValue(item) === selected) || {})

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      className={clsx(classes.formControl, className)}
      fullWidth={fullWidth}
      variant={variant}
    >
      <InputLabel ref={inputLabel} shrink={shrink} className={classes.inputLabel}>
        {label}
      </InputLabel>

      <Select
        {...field}
        {...rest}
        renderValue={renderValue}
        labelWidth={labelWidth}
        MenuProps={{
          disablePortal: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          getContentAnchorEl: null,
        }}
        classes={{ select: classes.select }}
        className={classes.select}
      >
        {options.map((option: IOptionsType) => (
          <MenuItem key={extractId(option)} value={extractValue(option)}>
            {extractLabel(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
