import React from 'react'
import { Route } from 'react-router-dom'
import { MainLayout } from '../layouts'

import { ISecureRouteParams } from './types'

const RouteHOC = ({ children, toggleTheme, ...rest }: ISecureRouteParams) => {
  return <Route {...rest} render={() => <MainLayout toggleTheme={toggleTheme}>{children}</MainLayout>} />
}

export default RouteHOC
