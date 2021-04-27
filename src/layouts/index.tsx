import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Footer, Header } from 'common'
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
  const match = useRouteMatch({
    path: routes.artworkDetails,
    strict: true,
    sensitive: true,
  })

  return (
    <div className={classes.root}>
      <Header toggleTheme={toggleTheme} />
      <Box className={classes.wrapper}>
        {children}
        {!match && <Footer />}
      </Box>
    </div>
  )
}
