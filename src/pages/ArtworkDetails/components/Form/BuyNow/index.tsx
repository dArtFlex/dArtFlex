import React from 'react'
import { useFormikContext } from 'formik'
import FormBuyDetails from './FormBuyDetails'
import FormBuyApprove from './FormBuyApprove'
import { ApprovedFormState } from '../../../types'

export default function FormAuction() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()

  switch (values.formProgress) {
    case 'details':
      return <FormBuyDetails onSubmit={() => setFieldValue('formProgress', 'buy')} />
    case 'buy':
      return <FormBuyApprove />
    default:
      return null
  }
}
