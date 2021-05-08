import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Footer, Header, Modal, WalletError } from 'common'
import { selectWalletError } from 'stores/selectors'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'

interface IMainLayoutProps {
  children: JSX.Element
  toggleTheme: () => void
  hiddenFooter?: boolean
}

export const MainLayout = ({ toggleTheme, hiddenFooter, children }: IMainLayoutProps): JSX.Element => {
  const classes = useStyles()
  const { error } = useSelector(selectWalletError())

  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setOpen(Boolean(error.length))
  }, [error])

  return (
    <div className={classes.root}>
      <Header toggleTheme={toggleTheme} />
      <Box className={classes.wrapper}>
        {children}
        {!hiddenFooter && <Footer />}
      </Box>

      <Modal open={open} onClose={() => setOpen(false)} body={<WalletError />} withAside />
    </div>
  )
}
