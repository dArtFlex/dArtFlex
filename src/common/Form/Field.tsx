import React, { Dispatch, SetStateAction } from 'react'
import { TextFieldProps } from '@material-ui/core'
import { Field as FormikField } from 'formik'
import FormUpload from './controls/Upload'
import FormTextInput from './controls/Input'
import FormSwitch from './controls/Switch'
import FormCheckbox from './controls/Checkbox'
import FormSelect, { IFormSelectProps } from './controls/Select'
import FormDatePicker from './controls/DatePicker'
import { IFormDatePickerProps } from './controls/DatePicker/types'
import { FieldRenderProps, ITextInput, IUploadInput, IFormSwitchProps, IFormCheckboxProps } from './types'
import { FieldInputProps } from 'formik/dist/types'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import clsx from 'clsx'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { useStyles } from './styles'

export type FieldType = 'input' | 'upload' | 'switch' | 'select' | 'picker' | 'checkbox'

export type IFieldProps = IFormSelectProps &
  ITextInput &
  IUploadInput &
  TextFieldProps &
  IFormSwitchProps &
  IFormCheckboxProps &
  IFormDatePickerProps & {
    name: string
    type: FieldType
    date?: Date
    setDate?: Dispatch<SetStateAction<any>>
  }

export default function Field(props: IFieldProps) {
  const { name, type, date, setDate, ...rest } = props

  const classes = useStyles()

  return (
    <FormikField key={name} name={name}>
      {({ form, field }: FieldRenderProps) => {
        switch (type) {
          case 'upload': {
            return <FormUpload form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'input': {
            return <FormTextInput form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'switch': {
            return <FormSwitch form={form} field={field as FieldInputProps<boolean>} name={name} {...rest} />
          }
          case 'checkbox': {
            return <FormCheckbox form={form} field={field as FieldInputProps<boolean>} name={name} {...rest} />
          }
          case 'select': {
            return <FormSelect form={form} field={field as FieldInputProps<string>} name={name} {...rest} />
          }
          case 'picker': {
            return (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  value={date}
                  onChange={(newDate) => setDate!(newDate)}
                  ampm={false}
                  classes={{}}
                  format={'MM/dd/yyyy hh:mm'}
                  className={clsx(classes.timePickerWrapper, classes.timePicker)}
                />
              </MuiPickersUtilsProvider>
            )
          }
          default: {
            return null
          }
        }
      }}
    </FormikField>
  )
}
