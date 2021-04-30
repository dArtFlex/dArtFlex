import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Footer, Header, Modal, WalletError } from 'common'
import { selectWalletError } from 'stores/selectors'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'
import routes from '../routes'

interface IMainLayoutProps {
  children: JSX.Element
  toggleTheme: () => void
  withFooter?: boolean
}

export const MainLayout = ({ toggleTheme, children }: IMainLayoutProps): JSX.Element => {
  const classes = useStyles()
  const { error } = useSelector(selectWalletError())
  const match = useRouteMatch({
    path: routes.artworkDetails,
    strict: true,
    sensitive: true,
  })
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setOpen(Boolean(error.length))
  }, [error])

  return (
    <div className={classes.root}>
      <Header toggleTheme={toggleTheme} />
      <Box className={classes.wrapper}>
        {children}
        {!match && <Footer />}
      </Box>

      <Modal open={open} onClose={() => setOpen(false)} body={<WalletError />} withAside />
    </div>
  )
}
