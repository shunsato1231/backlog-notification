import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { StartView } from './StartView.component';
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'
import * as AuthContext from '../../../Hooks/Auth/Auth.context';

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] StartView', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StartView />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should call signin when button click when not logged in', ()=> {
    const signinMock = jest.fn();

    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(():any => {
      return {
        user: null,
        signin: signinMock
      }
    })

    const wrapper = shallow(<StartView />)

    wrapper.find(sel('signin-button')).simulate('click')
    expect(signinMock).toBeCalled()
  })

  it('should call next when button click when logged in', ()=> {
    const nextMock = jest.fn();

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: nextMock,
      }
    })

    jest.spyOn(AuthContext, 'useAuthContext').mockImplementation(():any => {
      return {
        user: 'testUserId'
      }
    })

    const wrapper = shallow(<StartView />)

    wrapper.find(sel('button')).simulate('click')
    expect(nextMock).toBeCalled()
  })

  it('should wrapper class notStarted when currentStep = "allPending"', () => {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 'allPending',
      }
    })

    const wrapper = shallow(<StartView />)

    expect(wrapper.find(sel('wrapper')).hasClass('wrapper')).toBe(true)
    expect(wrapper.find(sel('wrapper')).hasClass('started')).toBe(false)
  })

  it('should wrapper add class started when currentStep>1', () => {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 0,
      }
    })

    const wrapper = shallow(<StartView />)

    expect(wrapper.find(sel('wrapper')).hasClass('wrapper')).toBe(true)
    expect(wrapper.find(sel('wrapper')).hasClass('started')).toBe(true)
  })
})
