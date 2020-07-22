import React from 'react'
import ReactDOM from 'react-dom'
import { Redirect, Route, BrowserRouter } from "react-router-dom"
import { shallow } from 'enzyme'
import * as AuthContext from '../Hooks/Auth/Auth.context'
import { GuestRoute } from './GuestRoute'
import { Introduction } from '../Components/pages/Introduction/Introduction.component'

describe('[ROUTES] GuestRoute', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <GuestRoute path="/introduction" component={Introduction} toRedirect='/' />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should return redirect component when login app', () => {
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

    const wrapper = shallow(<GuestRoute path="/introduction" component={Introduction} toRedirect='/' />)
    expect(wrapper.find(Redirect).length).toBe(1)
  })

  it('should return route component when not login app', () => {
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

    const wrapper = shallow(<GuestRoute path="/introduction" component={Introduction} toRedirect='/' />)
    expect(wrapper.find(Route).length).toBe(1)
  })
})