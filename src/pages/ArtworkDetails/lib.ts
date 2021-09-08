import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    // Todo needs to add validation
    // bid: yup.number().positive('Amount should be positive'),
  })
}

export function validatePrice(value: string | number) {
  let error
  if (typeof value === 'string' && !value.length) {
    error = 'Required'
  } else if (value <= 0) {
    error = 'Reserve price should be more then 0'
  } else if (!/^\d+(\.\d+)?$/.test(`${value}`)) {
    error = 'Incorrect number format'
  }
  return error
}
