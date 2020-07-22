import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, BrowserRouter } from "react-router-dom"
import { shallow } from 'enzyme'
import * as AuthContext from '../Hooks/Auth/Auth.context'
import { PrivateRoute } from './PrivateRoute'
import { Dashboard } from '../Components/pages/Dashboard/Dashboard.component'

describe('[ROUTES] PrivateRoute', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <PrivateRoute path="/Dashboard" component={Dashboard} toRedirect='/' />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should return route component when login app', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(():any => {
      return {
        uid: 'testID',
        info: {
          apiKey: 'testKey',
          userList: ['testUser'],
          notificationKey: 'testKey'
        }
      }
    })

    const wrapper = shallow(<PrivateRoute path="/Dashboard" component={Dashboard} toRedirect='/' />)
    expect(wrapper.find(Route).length).toBe(1)
  })

  it('should return redirect component when not login app', () => {
    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(():any => {
      return {
        uid: '',
        info: {
          apiKey: '',
          userList: [''],
          notificationKey: ''
        }
      }
    })

    const wrapper = shallow(<PrivateRoute path="/Dashboard" component={Dashboard} toRedirect='/' />)
    expect(wrapper.find(Redirect).length).toBe(1)
  })
})