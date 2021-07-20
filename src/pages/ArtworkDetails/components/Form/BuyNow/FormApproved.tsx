import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { Box, Typography, Link, Button } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { ExternalLinkIcon, SuccessfullyIcon } from 'common/icons'
import { useStyles } from '../styles'
import routes from 'routes'

export default function FormApproved() {
  const classes = useStyles()
  const [fetch, setFetch] = useState<boolean>(true)
  const history = useHistory()

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
            Your transaction has started
          </Typography>
        </Box>
        <Box mb={5.5}>
          <CircularProgressLoader />
        </Box>
        <Box mb={5}>
          <Box className={classes.infoRowIcon}>
            <Box className={classes.warningSubText}>
              <Box mb={4}>
                <Typography className={classes.warningText}>
                  {`The Ethereum network is processing your transaction, which can take a little while. We'll send you an e-mail when it goes through.`}
                </Typography>
              </Box>
              <Typography className={classes.warningText}>
                {`In the meantime check out `}
                <Link href={'#'}>other Artworks on dArtflex</Link>
              </Typography>
            </Box>
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
            Your transaction succeeded
          </Typography>
        </Box>
        <Box mb={5.5}>
          <SuccessfullyIcon />
        </Box>
        <Box mb={5.5} className={classes.externalLink}>
          <ExternalLinkIcon />
          <Typography className={classes.externalLinkText}>{`View on Ethescan`}</Typography>
        </Box>
        <Button
          onClick={() => history.push(routes.dashboard)}
          variant={'outlined'}
          color={'secondary'}
          disableElevation
          className={clsx(classes.bitViewBtn)}
        >
          View My Profile
        </Button>
      </Box>
    </Box>
  )
}
