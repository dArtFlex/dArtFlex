import React, { memo, useCallback } from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import DateFnsUtils from '@date-io/date-fns'
import { getFormikFieldError } from '../../lib'
import FormControl from '../FormControl'
import { IFormDatePickerProps } from './types'
import { FieldRenderProps } from '../../types'
import { useStyles } from './styles'

function FormDatePicker(props: IFormDatePickerProps & FieldRenderProps<string>) {
  const { form, field, label, disabled, className, inputVariant = 'outlined', fullWidth, helperText } = props
  const classes = useStyles()
  const { errorText, hasError } = getFormikFieldError({ form, field })

  const handleChange = useCallback(
    (date: MaterialUiPickersDate | null, value?: string | null) => {
      form.setFieldValue(field.name, date?.toJSON() ?? value)
      // By default field is set touched on blur.
      // Datepicker can be changed via date selector, without focusing/blurring input.
      form.setFieldTouched(field.name, true)
    },
    [field.name, form]
  )

  return (
    <FormControl
      error={hasError}
      errorText={errorText}
      className={className}
      helperText={helperText}
      fullWidth={fullWidth}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          disableToolbar
          format="dd.MM.yyyy"
          margin="none"
          autoComplete="off"
          label={label}
          disabled={disabled}
          inputVariant={inputVariant}
          variant="inline"
          error={hasError}
          invalidDateMessage={false}
          maxDateMessage={false}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          {...field}
          value={field.value ? field.value : null}
          onChange={handleChange}
          classes={{
            root: classes.datePicker,
          }}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
  )
}

export default memo(FormDatePicker)
