import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    startDate: yup.date().min(new Date(), 'Incorrect date'),
    endDate: yup.date().min(new Date(), 'Incorrect date'),
  })
}

export function validatePrice(value: string | number) {
  let error
  if (typeof value === 'string' && !value.length) {
    error = 'Required'
  } else if (value <= 0) {
    error = 'Price bid should be more then 0'
  } else if (!/^\d+(\.\d+)?$/.test(`${value}`)) {
    error = 'Incorrect number format'
  }
  return error
}

export function validateMinimumBid(value: string | number) {
  let error
  if (typeof value === 'string' && !value.length) {
    error = 'Required'
  } else if (value <= 0) {
    error = 'Minimin bid should be more then 0'
  } else if (!/^\d+(\.\d+)?$/.test(`${value}`)) {
    error = 'Incorrect number format'
  }
  return error
}

export function validateReservePrice(value: string | number, relatedValue: string | number) {
  let error
  if (typeof value === 'string' && !value.length) {
    error = 'Required'
  } else if (value <= 0) {
    error = 'Reserve price should be more then 0'
  } else if (!/^\d+(\.\d+)?$/.test(`${value}`)) {
    error = 'Incorrect number format'
  } else if (value <= relatedValue) {
    error = 'Reserve price should be more then minimum bid'
  }
  return error
}
