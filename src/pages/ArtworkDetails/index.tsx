import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper, Form, CircularProgressLoader, ErrorInterceptor } from 'common'
import { FormContainer } from './components'
import { selectAssetDetails } from 'stores/selectors'
import { getAssetByIdRequest, clearAssetDetails } from 'stores/reducers/assets'
import { getBidsHistoryRequest, getBidsRequest, getOffersRequest } from 'stores/reducers/placeBid'
import { ApprovedFormState } from './types'
import appConst from 'config/consts'
import { useValidationSchema } from './lib'

const { INTERVALS } = appConst

const formData: ApprovedFormState = {
  bid: 0,
  priceDrop: '',
  acknowledge: false,
  agreeTerms: false,
  formProgress: 'details',
  promotion: false,
  salesTokenContract: '0x',
}

export default function ArtworkDetails() {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const { assetDetails } = useSelector(selectAssetDetails())

  const fetchAssetDetails = () => {
    dispatch(getAssetByIdRequest(Number(id)))
  }

  const fetchBidsHistory = () => {
    if (assetDetails) {
      dispatch(getBidsHistoryRequest())
      assetDetails.marketData?.id && dispatch(getBidsRequest({ market_id: assetDetails.marketData.id }))
      assetDetails.marketData?.item_id && dispatch(getOffersRequest({ item_id: assetDetails.marketData.item_id }))
    }
  }

  useEffect(() => {
    fetchAssetDetails()
    const iId0 = setInterval(() => fetchAssetDetails(), INTERVALS.UPDATE_BIDS_HISTORY)
    const iId1 = setInterval(() => fetchBidsHistory(), INTERVALS.UPDATE_BIDS_HISTORY)
    return () => {
      clearInterval(iId0)
      clearInterval(iId1)
      dispatch(clearAssetDetails())
    }
  }, [])

  useEffect(() => {
    if (!assetDetails) {
      return
    }
    dispatch(getBidsHistoryRequest())
    assetDetails.marketData?.id && dispatch(getBidsRequest({ market_id: assetDetails.marketData.id }))
    assetDetails.tokenData?.id && dispatch(getOffersRequest({ item_id: assetDetails.tokenData.id }))
  }, [assetDetails])

  return (
    <PageWrapper>
      <ErrorInterceptor reducers={['offer']}>
        {assetDetails.tokenData === null ? (
          <CircularProgressLoader />
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          <Form initialValues={formData} onSubmit={() => {}} validationSchema={useValidationSchema()}>
            <FormContainer />
          </Form>
        )}
      </ErrorInterceptor>
    </PageWrapper>
  )
}
