import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Footer, Header, Modal, WalletError } from 'common'
import { selectMinting, selectWalletError } from 'stores/selectors'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'
import { clearMintError } from '../../stores/reducers/minting'
import Snack from '../../common/Snack'

interface IMainLayoutProps {
  children: JSX.Element
  toggleTheme: () => void
  hiddenFooter?: boolean
}

export default function MainLayout({ toggleTheme, hiddenFooter, children }: IMainLayoutProps): JSX.Element {
  const classes = useStyles()
  const { error } = useSelector(selectWalletError())
  const { minting } = useSelector(selectMinting())

  const dispatch = useDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false)

  useEffect(() => {
    setOpen(Boolean(error.length))
  }, [error])
  useEffect(() => {
    setSnackBarOpen(Boolean(minting.error.length))
  }, [minting.error])
  function onCloseSnackbar() {
    setSnackBarOpen(false)
    dispatch(clearMintError())
  }

  return (
    <div className={classes.root}>
      <Header toggleTheme={toggleTheme} />
      <Box className={classes.wrapper}>
        {children}
        {!hiddenFooter && <Footer />}
      </Box>
      <Snack message={minting.error} open={snackbarOpen} onClose={onCloseSnackbar} />
      <Modal open={open} onClose={() => setOpen(false)} body={<WalletError />} withAside />
    </div>
  )
}
