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
      return <FormDetails onSubmit={() => setFieldValue('formProgress', 'buy')} />
    case 'buy':
      return (
        <FormBuy
          onSubmit={() => {
            setFieldValue('formProgress', 'approved')
            dispatch(buyNowRequest({ amount: marketData?.start_price, order_id: bids && bids[0].order_id })) // should
          }}
          onMakeOffer={() => {
            setFieldValue('formProgress', 'approved')
            dispatch(makeOfferRequest({ amount: values.bid }))
          }}
        />
      )
    case 'approved':
      return <FormApproved />
    default:
      return null
  }
}
