import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    name: yup.string().max(50).required(),
    description: yup.string().required(),
    royalties: yup
      .string()
      .max(50)
      .test('number', 'The value is incorrect', (value) => /^\d+(\.\d{1,1})?$/.test(`${value}`))
      .required(),
  })
}
