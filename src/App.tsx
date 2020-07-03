import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Introduction } from './Components/pages/Introduction/Introduction.component'
import { ToastProvider } from './Hooks/Toast/Toast.context'

const App: React.SFC = () => {
  return(
    <Router>
      <Switch>
      <ToastProvider>
        <Route path="/introduction" component={Introduction} exact/>
        <Route path='/' exact>index</Route>
      </ToastProvider>
      </Switch>
    </Router>
  )
}

export default App
