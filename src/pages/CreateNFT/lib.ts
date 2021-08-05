import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    name: yup
      .string()
      .max(50)
      .required()
      .matches(/^[A-Za-z0-9\s]+$/, 'Use latin alphabet'),
    description: yup
      .string()
      .required()
      .matches(/^[A-Za-z0-9\s]+$/, 'Use latin alphabet'),
    royalties: yup
      .string()
      .max(50)
      .test('number', 'The value is incorrect', (value) => /^\d+(\.\d{1,1})?$/.test(`${value}`))
      .required(),
  })
}
