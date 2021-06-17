import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Box, Typography, Link, Button } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { ExternalLinkIcon, SuccessfullyIcon } from 'common/icons'
import { selectAsset } from 'stores/selectors'
import appConst from 'config/consts'
import { useStyles } from './styles'

const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET },
} = appConst

export default function ApprovedSubForm() {
  const classes = useStyles()
  const [fetch, setFetch] = useState<boolean>(true)
  const { assetDetails } = useSelector(selectAsset())

  const status = assetDetails.infoData?._status

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
            {(status === RESERVE_NOT_MET || status === LIVE_AUCTION) && `Your bid has been submitted!`}
            {status === BUY_NOW && `Your transaction has started`}
          </Typography>
        </Box>
        <Box mb={5.5}>
          <CircularProgressLoader />
        </Box>
        <Box mb={5}>
          <Box className={classes.infoRowIcon}>
            {(status === RESERVE_NOT_MET || status === LIVE_AUCTION) && (
              <Typography
                className={classes.warningText}
              >{`Your bid is being confirmed on the Ethereum blockchain. You are free to leave this page if you like`}</Typography>
            )}
            {status === BUY_NOW && (
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
            )}
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
          {(status === RESERVE_NOT_MET || status === LIVE_AUCTION) && (
            <Typography variant="h1" component="p">
              Your bid was placed successfully!
            </Typography>
          )}
          {status === BUY_NOW && (
            <Typography variant="h1" component="p">
              Your transaction succeeded
            </Typography>
          )}
        </Box>
        <Box mb={5.5}>
          <SuccessfullyIcon />
        </Box>
        {(status === RESERVE_NOT_MET || status === LIVE_AUCTION) && (
          <Box mb={5}>
            <Box className={classes.infoRowIcon}>
              <Typography
                className={classes.warningText}
              >{`Your bid was confirmed on the Ethereum blockchain. Please keep an eye on this auction in case someone outbids you before it's over`}</Typography>
            </Box>
          </Box>
        )}
        <Box mb={5.5} className={classes.externalLink}>
          <ExternalLinkIcon />
          <Typography className={classes.externalLinkText}>{`View on Ethescan`}</Typography>
        </Box>
        {(status === RESERVE_NOT_MET || status === LIVE_AUCTION) && (
          <Button variant={'outlined'} color={'secondary'} disableElevation className={clsx(classes.bitViewBtn)}>
            View Artwork
          </Button>
        )}
        {status === BUY_NOW && (
          <Button variant={'outlined'} color={'secondary'} disableElevation className={clsx(classes.bitViewBtn)}>
            View My Profile
          </Button>
        )}
      </Box>
    </Box>
  )
}
