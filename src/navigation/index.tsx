import React from 'react'
import { createBrowserHistory } from 'history'
import { IAppRouterProps } from './types'
import { Router, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'
import RouteHOC from './RouteHOC'
import { ArtworksPage } from 'pages'

export const history = createBrowserHistory()

const MainNavigation = () => {
  const appRoutes: IAppRouterProps[] = [
    {
      path: routes.artworks,
      component: <ArtworksPage />,
    },
    {
      path: routes.blog,
      component: <div>blog</div>,
    },
  ]

  return (
    <Router history={history}>
      <Switch>
        <RouteHOC exact path="/">
          <Redirect to={routes.artworks} />
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
