import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAssetDetails, selectBid } from 'stores/selectors'
import { useFormikContext } from 'formik'
import { buyNowRequest } from 'stores/reducers/buyNow'
import { makeOfferRequest } from 'stores/reducers/makeOffer'
import FormDetails from './FormDetails'
import FormBuy from './FormBuy'
import FormApproved from './FormApproved'
import { ApprovedFormState } from '../../../types'
import FormMakeOffer from './FormMakeOffer'
import FormApprovedOffer from '../FormApprovedOffer'

export default function FormAuction() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const dispatch = useDispatch()
  const {
    assetDetails: { marketData },
  } = useSelector(selectAssetDetails())
  const {
    bid: { bids },
  } = useSelector(selectBid())

  switch (values.formProgress) {
    case 'details':
      return <FormDetails onSubmit={setFieldValue} />
    case 'buy':
      return (
        <FormBuy
          onSubmit={() => {
            setFieldValue('formProgress', 'approved')
            dispatch(buyNowRequest({ amount: marketData?.start_price, order_id: bids && bids[0].order_id })) // Should first element
          }}
        />
      )
    case 'make offer':
      return (
        <FormMakeOffer
          onSubmit={() => {
            setFieldValue('formProgress', 'confirm offer')
            dispatch(makeOfferRequest({ amount: values.bid }))
          }}
        />
      )
    case 'approved':
      return <FormApproved onSubmit={() => setFieldValue('formProgress', 'details')} />
    case 'confirm offer':
      return (
        <FormApprovedOffer
          onSubmit={() => {
            setFieldValue('bid', '0')
            setFieldValue('formProgress', 'details')
          }}
        />
      )
    default:
      return null
  }
}
