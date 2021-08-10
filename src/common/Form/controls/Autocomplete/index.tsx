import React from 'react'
import clsx from 'clsx'
import { useFormikContext } from 'formik'
import { Typography, TextField, Chip, Box } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import FormControl from '../FormControl'
import { getFormikFieldError } from '../../lib'
import { IBaseFormAutocompleteProps } from './types'
import { useStyles } from './styles'

const filter = createFilterOptions()

export default function FormAutocomplete(props: IBaseFormAutocompleteProps) {
  const classes = useStyles()
  const {
    form,
    field,
    helperText,
    options = [],
    variant = 'outlined',
    required, // eslint-disable-line @typescript-eslint/no-unused-vars
    label,
    className,
    fullWidth,
    withClearOnBlur = true,
    withMultiple = false,
    witChips = false,
  } = props

  const { errorText, hasError } = getFormikFieldError({ form, field })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>()

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      helperText={helperText}
      className={clsx(classes.formControl, className)}
      fullWidth={fullWidth}
      variant={variant}
    >
      {label && (
        <Typography className={clsx(classes.inputLabel, required && classes.star)} component="span">
          {label}
        </Typography>
      )}

      <Autocomplete
        {...field}
        classes={{
          inputRoot: classes.rootAutocomplete,
          root: witChips ? classes.hiddenInputChips : '',
        }}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setFieldValue(field.name, {
              title: newValue,
            })
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setFieldValue(field.name, {
              title: newValue.inputValue,
            })
          } else {
            setFieldValue(field.name, newValue)
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          // Todo: Need to check as it redundant filter
          const doubleCheck = options.filter((o) => o.title === params.inputValue)

          // Suggest the creation of a new value
          if (params.inputValue !== '' && doubleCheck.length === 0) {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            })
          }

          return filtered
        }}
        id="autocomplete"
        options={options}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue
          }
          // Regular option
          return option.title
        }}
        renderOption={(option) => option.title}
        renderInput={(params) => <TextField {...params} variant={variant} />}
        // Pre-settings
        clearOnBlur={withClearOnBlur}
        multiple={withMultiple}
        freeSolo
        selectOnFocus
        handleHomeEndKeys
      />
      {witChips && values[field.name].length ? (
        <Box className={classes.chipsWrapper}>
          {values[field.name].map((el: { inputValue: string; title: string }, i: number) => (
            <Chip
              key={i}
              label={el.inputValue || el.title || el}
              onDelete={() =>
                setFieldValue(
                  field.name,
                  values[field.name].filter((_: unknown, _i: number) => _i !== i)
                )
              }
              className={classes.chip}
            />
          ))}
        </Box>
      ) : null}
    </FormControl>
  )
}
