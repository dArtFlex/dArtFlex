import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Snackbar, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { stateType } from 'stores/reducers'
import { selectMakeOfferError } from 'stores/selectors'
import { clearMakeOfferError } from '../../stores/reducers/makeOffer'
import { IError } from 'types'
import { useStyles } from './styles'

interface IErrorInterceptor {
  reducers: Array<keyof stateType>
  children: React.ReactChild
  messageType?: 'success' | 'error'
  duration?: number
}

export default function ErrorInterceptor(props: IErrorInterceptor) {
  const { children, reducers, messageType = 'error', duration = 10000 } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  // In order to extends handler we need to add specific selector
  const { error: errorMakeOffer } = useSelector(selectMakeOfferError())

  useEffect(() => {
    let catcher: IError = ''
    reducers.forEach((reducer) => {
      if (reducer === 'offer') catcher = errorMakeOffer
    })

    setMessage(typeof catcher === 'object' ? (catcher as { message: string }).message : catcher)
  }, [errorMakeOffer])

  function onCloseSnackbar() {
    // Cleaner for selector handler
    reducers.some((k) => k === 'offer') && dispatch(clearMakeOfferError())
  }

  return (
    <>
      {children}

      <Snackbar
        open={Boolean(message.length)}
        onClose={onCloseSnackbar}
        autoHideDuration={duration}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={messageType}
          onClose={onCloseSnackbar}
          className={clsx(messageType === 'success' && classes.snackBarSuccess, classes.snackbarWrapper)}
          classes={{ icon: classes.errorIcon }}
        >
          <Typography variant={'h3'}>{message}</Typography>
        </Alert>
      </Snackbar>
    </>
  )
}
