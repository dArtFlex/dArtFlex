import { RouteComponentProps } from 'react-router-dom'

export interface INavigation {
  data?: { sideBar: boolean }
}

export interface IAppRouterProps {
  path?: string
  component: JSX.Element
  rest?: Record<string, unknown>
}

export interface ISecureRouteParams {
  children: JSX.Element
  rest?: Record<string, unknown>
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  exact?: boolean
  path?: string | string[]
}
