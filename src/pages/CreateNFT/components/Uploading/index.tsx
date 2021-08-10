import React from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Button, CircularProgress } from '@material-ui/core'
import { ICreateNFT } from '../../types'

import { useStyles } from './styles'

export default function Uploading() {
  const classes = useStyles()
  const { setFieldValue } = useFormikContext<ICreateNFT>()

  return (
    <Box className={classes.uploadBox}>
      <Typography variant={'h1'}>Uploading</Typography>
      <Box mt={4} mb={4}>
        <CircularProgress />
      </Box>
      <Button variant={'outlined'} onClick={() => setFieldValue('file', null)}>
        Cancel Uploading
      </Button>
    </Box>
  )
}
