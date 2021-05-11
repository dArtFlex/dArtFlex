import React from 'react'
import { Formik } from 'formik'
import { SchemaOf } from 'yup'

interface IFormProps {
  data: any
  validationSchema?: SchemaOf<any>
  onCancel: () => void
  onSubmit: () => void
  children: React.ReactChild
}

export default function Form(props: IFormProps) {
  const { data, validationSchema, onCancel, onSubmit, children } = props

  return (
    <Formik initialValues={data} validationSchema={validationSchema} onReset={onCancel} onSubmit={onSubmit}>
      {children}
    </Formik>
  )
}
