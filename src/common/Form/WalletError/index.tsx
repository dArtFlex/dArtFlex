import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { ReloadIcon } from 'common/icons'
import { useStyles } from './styles'

export default function WalletError() {
  const classes = useStyles()

  return (
    <Box className={classes.walletError}>
      <Typography variant="h2" className={classes.walletErrorText}>
        Wrong network!
      </Typography>
      <Typography className={classes.walletErrorDesc}>
        Your wallet is connected to the wrong network Please change your network to one of mainnet Binance or Polygon
      </Typography>

      <Button
        onClick={() => {
          window.location.reload()
        }}
        variant={'contained'}
        fullWidth
        disableElevation
        className={classes.errorBtn}
        startIcon={<ReloadIcon />}
      >
        Reload
      </Button>
    </Box>
  )
}
