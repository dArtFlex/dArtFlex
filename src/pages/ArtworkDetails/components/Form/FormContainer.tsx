import React from 'react'
import { Form } from 'common'
import { useSelector } from 'react-redux'
import { DetailsForm, ApprovedForm, ApprovedSubForm } from '../../components'
import { ApprovedFormState, IFormContainer } from './types'
import { selectAsset } from 'stores/selectors'
import appConst from 'config/consts'

const {
  FILTER_VALUES: { BUY_NOW },
} = appConst

const initialApprovedData = {
  bid: 0,
  acknowledge: false,
  agreeTerms: false,
}

export default function FormContainer(props: IFormContainer) {
  const { formId, setFormId } = props
  const { assetDetails } = useSelector(selectAsset())

  switch (formId) {
    case 1:
      return (
        <DetailsForm
          onSubmit={() => {
            if (assetDetails.infoData?._status === BUY_NOW) {
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
          <ApprovedForm onSubmit={() => setFormId(formId + 1)} />
        </Form>
      )
    case 3:
      return <ApprovedSubForm />
    default:
      return null
  }
}
