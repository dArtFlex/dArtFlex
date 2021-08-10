import React from 'react'
import { Snackbar, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useStyles } from './styles'

interface ISnack {
  message: string
  open: boolean
  onClose: () => void
}

export default function Snack(props: ISnack) {
  const classes = useStyles()
  const { message, open, onClose } = props
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity="error"
        onClose={onClose}
        className={classes.snackbarWrapper}
        classes={{ icon: classes.errorIcon }}
      >
        <Typography variant={'h3'}>{message}</Typography>
      </Alert>
    </Snackbar>
  )
}
