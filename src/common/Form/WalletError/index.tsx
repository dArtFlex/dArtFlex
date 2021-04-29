import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Button } from '@material-ui/core'
import { ReloadIcon } from 'common/icons'
import { closeWarningModal } from 'stores/reducers/wallet'
import { useStyles } from './styles'

interface IWalletConnectProps {
  onClose?: () => void
}

export default function WalletConnect(props: IWalletConnectProps) {
  const { onClose } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Box className={classes.walletConnect}>
      <Typography variant="h2">Wrong network!</Typography>
      <Typography className={classes.walletConnectDesc}>
        Your wallet is connected to the wrong network Please change your network to one of mainnet
      </Typography>

      <Button
        onClick={() => {
          dispatch(closeWarningModal())
          onClose && onClose()
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
