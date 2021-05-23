import React, { useState } from 'react'
import { PageWrapper, Form } from 'common'
import { FormAccountSettings, VerificationTwitter } from './components'
import { IAccountSettings } from './types'
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
    other: '',
  },
}

export default function AccountSettings() {
  const classes = useStyles()
  const [openVerification, setOpenVerification] = useState<boolean>(false)

  const onSubmit = (values: IAccountSettings) => console.log(values)

  return (
    <PageWrapper className={classes.container}>
      <Form initialValues={data} onSubmit={onSubmit}>
        <>
          <FormAccountSettings setOpenVerification={() => setOpenVerification(true)} />
          <VerificationTwitter open={openVerification} setOpen={() => setOpenVerification(false)} />
        </>
      </Form>
    </PageWrapper>
  )
}
