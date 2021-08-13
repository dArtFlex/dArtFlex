import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Footer, Header, Modal, WalletError } from 'common'
import { selectMinting, selectWalletError, selectUser } from 'stores/selectors'
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
  const {
    minting: { error: mintingError },
  } = useSelector(selectMinting())
  const { error: userError } = useSelector(selectUser())

  const dispatch = useDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false)
  const errorMessage = mintingError || userError

  useEffect(() => {
    setOpen(Boolean(error.length))
  }, [error])

  useEffect(() => {
    setSnackBarOpen(Boolean(errorMessage.length))
  }, [errorMessage])

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
      <Snack message={errorMessage} open={snackbarOpen} onClose={onCloseSnackbar} />
      <Modal open={open} onClose={() => setOpen(false)} body={<WalletError />} withAside />
    </div>
  )
}
