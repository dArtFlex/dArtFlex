import React from 'react'
import { Header } from 'common'
import { useStyles } from './styles'

interface IMainLayoutProps {
  children: JSX.Element
}

export const MainLayout = ({ children }: IMainLayoutProps): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header />
      {children}
    </div>
  )
}
