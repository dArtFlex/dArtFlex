import React from 'react'
import { Route } from 'react-router-dom'
import { MainLayout } from '../layouts'

import { ISecureRouteParams } from './types'

const RouteHOC = ({ children, ...rest }: ISecureRouteParams) => {
  return <Route {...rest} render={() => <MainLayout>{children}</MainLayout>} />
}

export default RouteHOC
