import React from 'react'
import { useStyles } from '../styles'
import { Box, CircularProgress, Typography } from '@material-ui/core'

export default function AuthorizeForm() {
  const classes = useStyles()
  return (
    <Box className={classes.authorizeFormWrapper}>
      <Typography variant={'h1'}>Authorizing your account for this order...</Typography>
      <CircularProgress classes={{ root: classes.spinner }} />
    </Box>
  )
}
