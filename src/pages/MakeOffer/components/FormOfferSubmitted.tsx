import React from 'react'
import { useStyles } from '../styles'
import { Box, IconButton, Typography } from '@material-ui/core'
import { CircleSuccessIcon, ExternalLinkIcon } from '../../../common/icons'

export default function FormOfferSubmitted() {
  const classes = useStyles()
  return (
    <Box className={classes.submittedFormWrapper}>
      <Typography variant={'h1'}>Your offer was submitted successfully</Typography>
      <Box mt={6}>
        <CircleSuccessIcon />
      </Box>
      <Box mt={8} className={classes.flexBox}>
        <IconButton className={classes.etherScanIcon}>
          <ExternalLinkIcon />
        </IconButton>
        <Typography className={classes.textBold}>View on Ethescan</Typography>
      </Box>
    </Box>
  )
}
