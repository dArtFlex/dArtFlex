import React from 'react'
import { IMakeOfferForm } from '../types'
import FormArtworkInfo from './FormArtworkInfo'
import FormConfirmOffer from './FormConfirmOffer'
import AuthorizeForm from './AuthorizeForm'
import FormOfferSubmitted from './FormOfferSubmitted'
import { Form } from '../../../common/Form/index'

export default function MakeOfferForm(props: IMakeOfferForm) {
  const values = {
    offerExpiration: '',
    endDate: '',
  }

  return (
    <>
      {Boolean(props.formId === 1) && <FormArtworkInfo formId={props.formId} setFormId={props.setFormId} />}
      {Boolean(props.formId === 2) && (
        <Form initialValues={values} onSubmit={(values) => console.log(values)}>
          <FormConfirmOffer formId={props.formId} setFormId={props.setFormId} />
        </Form>
      )}
      {Boolean(props.formId === 3) && <AuthorizeForm />}
      {Boolean(props.formId === 4) && <FormOfferSubmitted />}
    </>
  )
}
