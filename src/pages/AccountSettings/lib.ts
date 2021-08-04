import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    fullname: yup
      .string()
      .max(32)
      .matches(/^[A-Za-z0-9]+$/, 'Use latin alphabet'),
    id: yup
      .string()
      .max(32)
      .required('Username is required')
      .matches(/^[A-Za-z0-9]+$/, 'Use latin alphabet'),
    overview: yup
      .string()
      .max(200)
      .matches(/^[A-Za-z0-9\s]+$/, 'Use latin alphabet'),
  })
}
