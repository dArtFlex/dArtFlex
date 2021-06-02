import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { ExternalLinkIcon } from 'common/icons'
import { useStyles } from './styles'

export default function InfoBid() {
  const classes = useStyles()
  return (
    <Box className={classes.infoBox}>
      <Typography variant={'h1'}>Your NFT is on its way!</Typography>
      <Typography
        className={classes.infoBoxDesc}
      >{`Congratulations, you are claiming your NFT, and it's currently being transferred to your wallet. You are free to navigate away from this page if you'd like`}</Typography>
      <Box className={classes.linkBox}>
        <ExternalLinkIcon />
        <Typography variant={'body1'}>View on Ethescan</Typography>
      </Box>
      <Button variant={'contained'} className={classes.btnGoTo}>
        Go to Artworks
      </Button>
    </Box>
  )
}
