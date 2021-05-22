import React from 'react'
import { Form } from 'common'
import { DetailsForm, ApprovedForm, ApprovedSubForm } from '../../components'
import { ApprovedFormState, IFormContainer } from './types'

const initialApprovedData = {
  bid: 0,
  acknowledge: false,
  agreeTerms: false,
}

export default function FormContainer(props: IFormContainer) {
  const { tokenId, formId, setFormId } = props

  switch (formId) {
    case 1:
      return <DetailsForm tokenId={tokenId} onSubmit={() => setFormId(formId + 1)} />
    case 2:
      return (
        <Form
          initialValues={initialApprovedData}
          onCancel={() => console.log('x')}
          onSubmit={(state: ApprovedFormState) => console.log('y', state)}
        >
          <ApprovedForm tokenId={tokenId} onSubmit={() => setFormId(formId + 1)} />
        </Form>
      )
    case 3:
      return <ApprovedSubForm tokenId={tokenId} />
    default:
      return null
  }
}
