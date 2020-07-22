import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { useAuthContext } from '../Hooks/Auth/Auth.context'

interface PrivateRouteProps extends RouteProps<{}> {
  path: string,
  component: React.FC<{}>
  toRedirect: string
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  component,
  toRedirect
}): JSX.Element => {
  const auth = useAuthContext()
  
  return auth.uid && auth.info.apiKey && auth.info.userList[0]
    ? <Route path={path} component={component} exact/>
    : <Redirect to={toRedirect} />
}