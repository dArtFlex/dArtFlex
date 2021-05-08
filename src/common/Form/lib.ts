import { FieldRenderProps } from './types'

export function getFormikFieldError(params: FieldRenderProps) {
  const { form, field } = params
  const { error, touched } = form.getFieldMeta(field.name)

  // Error is a string when field itself is validated,
  // and an array/object when it's nested fields are validated (if any).
  // In context of particular form inputs, we're only interested in field's *own* error.
  const isFieldOwnError = typeof error === 'string'

  return {
    hasError: isFieldOwnError && touched,
    errorText: isFieldOwnError ? error : undefined,
  }
}
