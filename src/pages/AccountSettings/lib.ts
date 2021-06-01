import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    fullname: yup.string().max(32),
    userid: yup.string().max(32).required('Username is required'),
  })
}
