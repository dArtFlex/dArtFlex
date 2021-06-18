import React from 'react'
import { createBrowserHistory } from 'history'
import { IAppRouterProps } from './types'
import { Router, Switch, Redirect } from 'react-router-dom'
import routes from '../routes'
import RouteHOC from './RouteHOC'
import Bids, { BidDetails } from 'pages/Bids'
import Sales from 'pages/Sales'
import {
  ContentManagement,
  ArtworkDetails,
  Artworks,
  AccountSettings,
  Dashboard,
  SellNFT,
  CreateNFT,
  Constructor,
  TradingHistory,
} from '../pages/index'

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
      path: routes.tradingHistory,
      component: <TradingHistory />,
    },
    {
      path: routes.bids,
      component: <Bids />,
    },
    {
      path: routes.bidDetails,
      component: <BidDetails />,
    },
    {
      path: routes.sales,
      component: <Sales />,
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
    {
      path: routes.contentManagement,
      component: <ContentManagement />,
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
