import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    bid: yup.number().positive('Amount should be positive'),
  })
}
