import React from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import { Introduction } from './Components/pages/Introduction/Introduction.component'
import { ToastProvider } from './Hooks/Toast/Toast.context'
import { AuthProvider } from './Hooks/Auth/Auth.context'
import { Dashboard } from './Components/pages/Dashboard/Dashboard.component'
import { PrivateRoute } from './Routes/PrivateRoute'
import { GuestRoute } from './Routes/GuestRoute'


const App: React.SFC = () => {
  return(
    <AuthProvider>
    <ToastProvider>
    <Router>
      <Switch>
        <GuestRoute path="/introduction" component={Introduction} toRedirect='/' />
        <PrivateRoute path='/' component={Dashboard} toRedirect='/introduction'/>
      </Switch>
    </Router>
    </ToastProvider>
    </AuthProvider>
  )
}

export default App
