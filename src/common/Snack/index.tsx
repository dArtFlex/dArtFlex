import React from 'react'
import { Snackbar, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useStyles } from './styles'
import clsx from 'clsx'

interface ISnack {
  errorMessage?: string
  successMessage?: string
  open: boolean
  onClose: () => void
}

export default function Snack(props: ISnack) {
  const classes = useStyles()
  const { errorMessage, successMessage, open, onClose } = props
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {successMessage?.length ? (
        <Alert
          severity="success"
          onClose={onClose}
          className={clsx(classes.snackBarSuccess, classes.snackbarWrapper)}
          classes={{ icon: classes.errorIcon }}
        >
          <Typography variant={'h3'}>{successMessage}</Typography>
        </Alert>
      ) : (
        <Alert
          severity="error"
          onClose={onClose}
          className={classes.snackbarWrapper}
          classes={{ icon: classes.errorIcon }}
        >
          <Typography variant={'h3'}>{errorMessage}</Typography>
        </Alert>
      )}
    </Snackbar>
  )
}
