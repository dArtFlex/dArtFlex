import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Link } from '@material-ui/core'
import { ButtonStartIcon } from 'common'
import { MetaMaskIcon } from 'common/icons'
import { connectMetaMaskRequest, connnectWalletConnectRequest } from 'stores/reducers/wallet'
import { useStyles } from './styles'

interface IWalletConnectProps {
  onClose: () => void
}

export default function WalletConnect(props: IWalletConnectProps) {
  const { onClose } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Box className={classes.walletConnect}>
      <Typography variant="h2">Connect your wallet</Typography>
      <Typography className={classes.walletConnectDesc}>
        By connecting your wallet, you agree to our{' '}
        <Link href="#" underline="none" color="textPrimary" className={classes.walletTermLink}>
          Terms of Service
        </Link>{' '}
        and our{' '}
        <Link href="#" underline="none" color="textPrimary" className={classes.walletTermLink}>
          Privacy Policy
        </Link>
      </Typography>

      <Box className={classes.connectBtnContainer}>
        <ButtonStartIcon
          onClick={() => {
            dispatch(connectMetaMaskRequest())
            onClose()
          }}
          variant={'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          icon={<MetaMaskIcon />}
        >
          MetaMask
        </ButtonStartIcon>
        <ButtonStartIcon
          onClick={() => {
            dispatch(connnectWalletConnectRequest())
            onClose()
          }}
          variant={'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          icon={<div></div>}
        >
          Wallet Connect
        </ButtonStartIcon>
      </Box>

      <Typography className={classes.walletConnectDesc}>New to Ethereum?</Typography>
      <Link href="#" underline="none" className={classes.walletLearnMoreLink}>
        Learn more about wallets
      </Link>
    </Box>
  )
}
