import React from 'react'
import { useFormikContext } from 'formik'
import FormDetails from './FormDetails'
import FormBuy from './FormBuy'
import FormApproved from './FormApproved'
import { ApprovedFormState } from '../../../types'

export default function FormAuction() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()

  switch (values.formProgress) {
    case 'details':
      return <FormDetails onSubmit={() => setFieldValue('formProgress', 'buy')} />
    case 'buy':
      return <FormBuy />
    case 'approved':
      return <FormApproved />
    default:
      return null
  }
}
