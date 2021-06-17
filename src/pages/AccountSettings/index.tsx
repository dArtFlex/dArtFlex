import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper, Form } from 'common'
import { FormAccountSettings, VerificationTwitter } from './components'
import { createNewUserRequest } from 'stores/reducers/user'
import { selectWallet } from 'stores/selectors'
import { IAccountSettings } from './types'
import { useValidationSchema } from './lib'
import { useStyles } from './styles'

const data: IAccountSettings = {
  fullname: '',
  userid: '',
  email: '',
  wallet: '',
  overview: '',
  profile_image: null,
  cover_image: null,
  socials: {
    website: '',
    twitter: '',
    instagram: '',
    discord: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    otherUrl: '',
  },
}

export default function AccountSettings() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openVerification, setOpenVerification] = useState<boolean>(false)

  const { wallet } = useSelector(selectWallet())

  const onSubmit = (values: IAccountSettings) => {
    dispatch(createNewUserRequest({ accountSettings: values, wallet: wallet?.accounts[0] as string }))
  }

  return (
    <PageWrapper className={classes.container}>
      <Form initialValues={data} onSubmit={onSubmit} validationSchema={useValidationSchema()}>
        <>
          <FormAccountSettings setOpenVerification={() => setOpenVerification(true)} />
          <VerificationTwitter open={openVerification} setOpen={() => setOpenVerification(false)} />
        </>
      </Form>
    </PageWrapper>
  )
}
