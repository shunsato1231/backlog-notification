import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Introduction } from './Components/pages/Introduction/Introduction.component'

const App: React.SFC = () => {
  return(
    <Router>
      <Switch>
        <Route path="/setting" component={Introduction} exact/>
        <Route path='/' exact>index</Route>
      </Switch>
    </Router>
  )
}

export default App
