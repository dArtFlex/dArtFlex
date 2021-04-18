import React from 'react'
import { createBrowserHistory } from 'history'
import { IAppRouterProps } from './types'
import { Router, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'
import RouteHOC from './RouteHOC'
import { ArtworkDetails, Artworks } from 'pages'

export const history = createBrowserHistory()

const MainNavigation = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const appRoutes: IAppRouterProps[] = [
    {
      path: routes.artworks,
      component: <Artworks />,
    },
    {
      path: routes.artworkDetails,
      component: <ArtworkDetails />,
    },
    {
      path: routes.blog,
      component: <div>blog</div>,
    },
  ]

  return (
    <Router history={history}>
      <Switch>
        <RouteHOC exact path="/" toggleTheme={toggleTheme}>
          <Redirect to={routes.artworks} />
        </RouteHOC>

        {appRoutes.map(({ path, component }) => (
          <RouteHOC exact path={path} key={path} toggleTheme={toggleTheme}>
            {component}
          </RouteHOC>
        ))}
      </Switch>
    </Router>
  )
}

export default MainNavigation
