import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    // Todo needs to add validation
    // bid: yup.number().positive('Amount should be positive'),
  })
}
