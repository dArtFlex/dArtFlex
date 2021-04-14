import React from 'react'
import { Footer, Header } from 'common'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'

interface IMainLayoutProps {
  children: JSX.Element
  toggleTheme: () => void
}

export const MainLayout = ({ toggleTheme, children }: IMainLayoutProps): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header toggleTheme={toggleTheme} />
      <Box className={classes.wrapper}>
        {children}
        <Footer />
      </Box>
    </div>
  )
}
