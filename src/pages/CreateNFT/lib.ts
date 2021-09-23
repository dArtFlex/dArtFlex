import * as yup from 'yup'

export function useValidationSchema() {
  const regExp = /^[A-Za-z0-9\s\.\,\-\'\"\/\?\;\:]+$/
  return yup.object().shape({
    name: yup.string().max(50).required().matches(regExp, 'Use latin alphabet'),
    description: yup.string().matches(regExp, 'Use latin alphabet').max(500, 'Max length is 500 symbols'),
    royalties: yup
      .string()
      .max(50)
      .test('number', 'The value is incorrect', (value) => /^\d+(\.\d{1,1})?$/.test(`${value}`))
      .required(),
  })
}
