import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Button, makeStyles, Theme, createStyles } from '@material-ui/core'
import { ReloadIcon } from 'common/icons'
import { closeWarningModal } from 'stores/reducers/wallet'

interface IWalletErrorProps {
  onClose?: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wellcome: {},
    title: {},
    btn: {},
  })
)

export default function WalletError(props: IWalletErrorProps) {
  const { onClose } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Box className={classes.wellcome}>
      <Typography className={classes.title}>Welcome to dArtflex!</Typography>I accept Community Guidelines
      <Button
        onClick={() => {
          dispatch(closeWarningModal())
          onClose && onClose()
          window.location.reload()
        }}
        variant={'contained'}
        fullWidth
        disableElevation
        className={classes.btn}
        startIcon={<ReloadIcon />}
      >
        Go to artworks
      </Button>
    </Box>
  )
}
