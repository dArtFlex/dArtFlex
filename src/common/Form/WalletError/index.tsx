import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Button } from '@material-ui/core'
import { ReloadIcon } from 'common/icons'
import { closeWarningModal } from 'stores/reducers/wallet'
import { useStyles } from './styles'

interface IWalletErrorProps {
  onClose?: () => void
}

export default function WalletError(props: IWalletErrorProps) {
  const { onClose } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Box className={classes.walletError}>
      <Typography variant="h2" className={classes.walletErrorText}>
        Wrong network!
      </Typography>
      <Typography className={classes.walletErrorDesc}>
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
