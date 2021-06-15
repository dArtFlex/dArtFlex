import React from 'react'
import { Form } from 'common'
import { useSelector } from 'react-redux'
// import { DetailsForm, ApprovedForm, ApprovedSubForm } from '../../components'
// import { ApprovedFormState, IFormContainer } from './types'
import { selectAsset } from 'stores/selectors'
import DetailsOfferForm from './DetailsOfferForm'
import { IFormOfferContainer } from './types'
import { ApprovedFormState } from '../../../ArtworkDetails/components/Form/types'
import appConst from '../../../../config/consts'
import { ApprovedSubForm } from '../../../ArtworkDetails/components'
import ApprovedOfferForm from './ApprovedOfferForm'

const initialApprovedData = {
  bid: 0,
  acknowledge: false,
  agreeTerms: false,
}

const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD },
} = appConst

export default function FormOfferContainer(props: IFormOfferContainer) {
  const { tokenId, formId, setFormId } = props
  const { asset } = useSelector(selectAsset(tokenId))

  switch (formId) {
    case 1:
      return (
        <DetailsOfferForm
          tokenId={tokenId}
          onSubmit={() => {
            if (asset?._status === BUY_NOW) {
              setFormId(formId + 2)
            } else {
              setFormId(formId + 1)
            }
          }}
        />
      )
    case 2:
      return (
        <Form
          initialValues={initialApprovedData}
          onCancel={() => console.log('x')}
          onSubmit={(state: ApprovedFormState) => console.log('y', state)}
        >
          <ApprovedOfferForm tokenId={tokenId} onSubmit={() => setFormId(formId + 1)} />
        </Form>
      )
    case 3:
      return <ApprovedSubForm tokenId={tokenId} />
    default:
      return null
  }
}
