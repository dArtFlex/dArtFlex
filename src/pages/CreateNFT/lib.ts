import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    name: yup.string().max(50).required(),
    description: yup.string().required(),
    royalties: yup.number().max(100).required(),
  })
}
