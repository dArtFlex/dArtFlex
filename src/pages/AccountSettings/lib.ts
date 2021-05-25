import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    userid: yup.string().max(32).required('Username is required'),
  })
}
