import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { useAuthContext } from './Hooks/Auth/Auth.context'

interface GuestRouteProps extends RouteProps<{}> {
  path: string,
  component: React.FC<{}>
  toRedirect: string
}

export const GuestRoute: React.FC<GuestRouteProps> = ({
  path,
  component,
  toRedirect
}): JSX.Element => {
  const auth = useAuthContext()
  return auth.user && auth.info.apiKey && auth.info.userList[0]
    ? <Redirect to={toRedirect} />
    : <Route path={path} component={component} exact/>
}