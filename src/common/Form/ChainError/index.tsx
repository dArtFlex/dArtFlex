import React from 'react'
import { useSelector } from 'react-redux'
import { selectWalletChainError } from 'stores/selectors'
import { Box, Typography, Button } from '@material-ui/core'
import { ReloadIcon } from 'common/icons'
import { useStyles } from './styles'
import { convertChainName } from 'utils'

export default function ChainError() {
  const classes = useStyles()
  const { chainError } = useSelector(selectWalletChainError())
  const chainName = chainError ? convertChainName(chainError) : 'Unhandled chain'

  return (
    <Box className={classes.walletError}>
      <Typography variant="h2" className={classes.walletErrorText}>
        {`Please switch to a wallet that supports ${chainName} network!`}
      </Typography>
      <Typography className={classes.walletErrorDesc}>
        {`In order to trade assets, connect to a ${chainName} network wallet. Please lock your current wallet and connect with
        a wallet that supports ${chainName} network.`}
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
