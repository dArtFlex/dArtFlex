import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Box, Typography, TextField, FormControlLabel, Checkbox, Link, Button, IconButton } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { InfoIcon, ExternalLinkIcon, SuccessfullyIcon } from 'common/icons'
import { createBidRequest } from 'stores/reducers/auction'
import { selectAsset } from 'stores/selectors'
import { useStyles } from './styles'

interface IApprovedSubFormProps {
  tokenId: string
}

export default function ApprovedSubForm(props: IApprovedSubFormProps) {
  const classes = useStyles()
  const [fetch, setFetch] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setFetch(false)
    }, 2000)
  }, [])

  return fetch ? (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            Your bid has been submitted!
          </Typography>
        </Box>
        <Box mb={5.5}>
          <CircularProgressLoader />
        </Box>
        <Box mb={5}>
          <Box className={classes.infoRowIcon}>
            <Typography
              className={classes.warningText}
            >{`Your bid is being confirmed on the Ethereum blockchain. You are free to leave this page if you like`}</Typography>
          </Box>
        </Box>
        <Box mb={5.5} className={classes.externalLink}>
          <ExternalLinkIcon />
          <Typography className={classes.externalLinkText}>{`View on Ethescan`}</Typography>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            Your bid was placed successfully!
          </Typography>
        </Box>
        <Box mb={5.5}>
          <SuccessfullyIcon />
        </Box>
        <Box mb={5}>
          <Box className={classes.infoRowIcon}>
            <Typography
              className={classes.warningText}
            >{`Your bid was confirmed on the Ethereum blockchain. Please keep an eye on this auction in case someone outbids you before it's over`}</Typography>
          </Box>
        </Box>
        <Box mb={5.5} className={classes.externalLink}>
          <ExternalLinkIcon />
          <Typography className={classes.externalLinkText}>{`View on Ethescan`}</Typography>
        </Box>
        <Button variant={'outlined'} color={'secondary'} disableElevation className={clsx(classes.bitViewBtn)}>
          View Artwork
        </Button>
      </Box>
    </Box>
  )
}
