import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Introduction } from './Components/pages/Introduction/Introduction.component'
import { ToastProvider } from './Hooks/Toast/Toast.context'
import { AuthProvider } from './Hooks/Auth/Auth.context'

const App: React.SFC = () => {
  return(
    <AuthProvider>
    <ToastProvider>
    <Router>
      <Switch>
        <Route path="/introduction" component={Introduction} exact/>
        <Route path='/' exact>index</Route>
      </Switch>
    </Router>
    </ToastProvider>
    </AuthProvider>
  )
}

export default App
