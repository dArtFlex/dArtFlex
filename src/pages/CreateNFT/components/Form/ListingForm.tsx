import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Link, useLocation } from 'react-router-dom'
import routes from '../../../../routes'

interface IListingForm {
  onViewArtwork: () => void
  isTabletMobile: boolean
}

export default function ListingForm(props: IListingForm) {
  const { onViewArtwork, isTabletMobile } = props
  const classes = useStyles()
  const { pathname } = useLocation()

  useEffect(() => {
    return () => {
      onViewArtwork()
    }
  }, [])

  return (
    <Box className={classes.confirming}>
      <Box pb={4}>
        <Typography variant={'h2'}>Your NFT has been listed!</Typography>
      </Box>
      <Box pb={10}>
        <Typography variant={'body1'} color={'textSecondary'}>
          Congratulations! Your artwork has officially been listed as an NFT on the Blockchain
        </Typography>
      </Box>
      <Link
        to={{
          pathname: routes.dashboard,
          state: { from: pathname },
        }}
        className={classes.redirectLink}
      >
        <Button variant={'outlined'} className={classes.btnView} fullWidth={isTabletMobile} onClick={onViewArtwork}>
          View Artwork
        </Button>
      </Link>
    </Box>
  )
}
