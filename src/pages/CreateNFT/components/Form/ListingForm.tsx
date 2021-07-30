import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'

interface IListingForm {
  onViewArtwork: () => void
  isTabletMobile: boolean
}

export default function ListingForm(props: IListingForm) {
  const { onViewArtwork, isTabletMobile } = props
  const classes = useStyles()

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
      <Button variant={'outlined'} className={classes.btnView} onClick={onViewArtwork} fullWidth={isTabletMobile}>
        View Artwork
      </Button>
    </Box>
  )
}
