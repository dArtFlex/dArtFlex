import React from 'react'
import { createBrowserHistory } from 'history'
import { IAppRouterProps } from './types'
import { Router, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'
import RouteHOC from './RouteHOC'

export const history = createBrowserHistory()

const MainNavigation = () => {
  const appRoutes: IAppRouterProps[] = [
    {
      path: routes.home,
      component: <div>HOME</div>,
    },
  ]

  return (
    <Router history={history}>
      <Switch>
        <RouteHOC exact path="/">
          <Redirect to={routes.home} />
        </RouteHOC>

        {appRoutes.map(({ path, component }) => (
          <RouteHOC exact path={path} key={path}>
            {component}
          </RouteHOC>
        ))}
      </Switch>
    </Router>
  )
}

export default MainNavigation
