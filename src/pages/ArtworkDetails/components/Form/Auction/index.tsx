import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormikContext } from 'formik'
import { placeBidRequest } from 'stores/reducers/placeBid'
import FormDetails from './FormDetails'
import FormAuction from './FormAuction'
import FormApproved from './FormApproved'
import { ApprovedFormState } from '../../../types'

export default function FormAuctionContainer() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const dispatch = useDispatch()

  switch (values.formProgress) {
    case 'details':
      return <FormDetails onSubmit={() => setFieldValue('formProgress', 'auction')} />
    case 'auction':
      return (
        <FormAuction
          onSubmit={() => {
            setFieldValue('formProgress', 'approved')
            dispatch(placeBidRequest({ bidAmount: values.bid }))
          }}
        />
      )
    case 'approved':
      return <FormApproved />
    default:
      return null
  }
}
