import React from 'react'
import { FormikConfig, FormikErrors } from 'formik/dist/types'
import { Formik } from 'formik'
import { SchemaOf } from 'yup'

interface FormControlsProps<T> {
  validationSchema?: SchemaOf<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  onCancel?: () => void
  onSubmit?: FormikConfig<T>['onSubmit']
  children: JSX.Element
  errors?: FormikErrors<T>
}

export type FormProps<T> = Omit<FormikConfig<T>, 'component' | 'render'> & FormControlsProps<T>

export default function Form<T>(props: FormProps<T>) {
  const { validationSchema, onCancel, onSubmit, children, ...rest } = props

  return (
    <Formik {...rest} validationSchema={validationSchema} onReset={onCancel} onSubmit={onSubmit}>
      {children}
    </Formik>
  )
}
