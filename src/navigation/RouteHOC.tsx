import React from 'react'
import { Route } from 'react-router-dom'
import { MainLayout } from '../layouts'

import { ISecureRouteParams } from './types'

const RouteHOC = ({ children, toggleTheme, hiddenFooter, ...rest }: ISecureRouteParams) => {
  return (
    <Route
      {...rest}
      render={() => (
        <MainLayout toggleTheme={toggleTheme} hiddenFooter={hiddenFooter}>
          {children}
        </MainLayout>
      )}
    />
  )
}

export default RouteHOC
