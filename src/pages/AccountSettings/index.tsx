import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper, Form } from 'common'
import { FormAccountSettings, VerificationTwitter } from './components'
import { createNewUserRequest } from 'stores/reducers/user'
import { selectUser, selectWallet } from 'stores/selectors'
import { IAccountSettings } from './types'
import { useValidationSchema } from './lib'
import { useStyles } from './styles'

const data: IAccountSettings = {
  fullname: '',
  id: '',
  email: '',
  wallet: '',
  overview: '',
  profile_image: null,
  cover_image: null,
  website: '',
  twitter: '',
  instagram: '',
  discord: '',
  facebook: '',
  youtube: '',
  tiktok: '',
  other_url: '',
  created_at: '',
  updated_at: '',
  role: '',
  ban: false,
}

export default function AccountSettings() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openVerification, setOpenVerification] = useState<boolean>(false)

  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())

  const onSubmit = (values: IAccountSettings) => {
    dispatch(
      createNewUserRequest({
        accountSettings: values,
        wallet: wallet?.accounts[0] as string,
        isNewProfileImage: typeof values.profile_image !== 'string',
        isNewCoverImage: typeof values.cover_image !== 'string',
      })
    )
  }

  const [initialValues, setInitialValues] = useState<IAccountSettings>(data)

  useEffect(() => {
    if (!user) {
      return
    }
    setInitialValues({
      ...user,
      id: String(user.id),
    })
  }, [user])

  return (
    <PageWrapper className={classes.container}>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={useValidationSchema()}
        enableReinitialize
      >
        <>
          <FormAccountSettings setOpenVerification={() => setOpenVerification(true)} user={user} />
          <VerificationTwitter open={openVerification} setOpen={() => setOpenVerification(false)} />
        </>
      </Form>
    </PageWrapper>
  )
}
