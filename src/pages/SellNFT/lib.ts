import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    startDate: yup.date().min(new Date(), 'Incorrect date'),
    endDate: yup.date().min(new Date(), 'Incorrect date'),
  })
}
