import React from 'react'
import { createBrowserHistory } from 'history'
import { IAppRouterProps } from './types'
import { Router, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'
import RouteHOC from './RouteHOC'
import ArtworkDetails from 'pages/ArtworkDetails'
import Artworks from 'pages/Artworks'
import AccountSettings from 'pages/AccountSettings'
import Dashboard from 'pages/Dashboard'
import SellNFT from 'pages/SellNFT'
import CreateNFT from 'pages/CreateNFT'
import Constructor from 'pages/Constructor'

export const history = createBrowserHistory()

const MainNavigation = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const appRoutes: IAppRouterProps[] = [
    {
      path: routes.artworks,
      component: <Artworks />,
    },
    {
      path: routes.artworkAccountSettings,
      component: <AccountSettings />,
    },
    {
      path: routes.dashboard,
      component: <Dashboard />,
    },
    {
      path: routes.sellNFT,
      component: <SellNFT />,
    },
    {
      path: routes.createNFT,
      component: <CreateNFT />,
    },
    {
      path: routes.constructor,
      component: <Constructor />,
    },
    {
      path: routes.artworkDetails,
      component: <ArtworkDetails />,
      hiddenFooter: true,
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

        {appRoutes.map(({ path, component, ...rest }) => (
          <RouteHOC exact path={path} key={path} toggleTheme={toggleTheme} {...rest}>
            {component}
          </RouteHOC>
        ))}
      </Switch>
    </Router>
  )
}

export default MainNavigation
