import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom';
import { SettingsConfirm, } from './SettingsConfirm.component'
import * as SettingsFormContext from '../../../Hooks/SettingsForm/SettingsForm.context'
import { mount } from 'enzyme'
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'
import * as ToastContext from '../../../Hooks/Toast/Toast.context'
import { errorMessages } from '../../../Hooks/SettingsForm/SettingsForm.hook'
import { act } from '@testing-library/react-hooks';

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] SettingsConfirm', ()=> {
  jest.useFakeTimers()

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SettingsConfirm/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should back setApikey and push toast when empty apiKey and userList', () => {
    const toastDispatchMock = jest.fn();
    const setNextProgressMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: '',
            userList: ['']
          },
          errors: {
            apiKey: errorMessages.apiKey,
            userList: errorMessages.userList
          }
        }
      }
    })

    jest.spyOn(ToastContext, 'useToastContext').mockImplementation(():any => {
      return {
        dispatch: toastDispatchMock
      }
    })

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 3,
        SetNextProgress: setNextProgressMock
      }
    })

    mount(<SettingsConfirm />)

    expect(toastDispatchMock.mock.calls[0][0]).toEqual({
      type: 'PUSH_NOTIFICATION',
      payload: {
        message: errorMessages.apiKey
      }
    })
    expect(toastDispatchMock.mock.calls[1][0]).toEqual({
      type: 'PUSH_NOTIFICATION',
      payload: {
        message: errorMessages.userList
      }
    })

    jest.runAllTimers()

    expect(setNextProgressMock).toBeCalledWith(1)
  })

  it('should back setApikey and push toast when empty apiKey', () => {
    const toastDispatchMock = jest.fn();
    const setNextProgressMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: '',
            userList: ['test1', 'test2']
          },
          errors: {
            apiKey: errorMessages.apiKey,
            userList: null
          }
        }
      }
    })

    jest.spyOn(ToastContext, 'useToastContext').mockImplementation(():any => {
      return {
        dispatch: toastDispatchMock
      }
    })

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 3,
        SetNextProgress: setNextProgressMock
      }
    })

    mount(<SettingsConfirm />)

    expect(toastDispatchMock).toBeCalledWith({
      type: 'PUSH_NOTIFICATION',
      payload: {
        message: errorMessages.apiKey
      }
    })

    jest.runAllTimers()

    expect(setNextProgressMock).toBeCalledWith(1)
  })

  it('should back setUserList and push toast when empty userList', () => {
    const toastDispatchMock = jest.fn();
    const setNextProgressMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: 'test1',
            userList: ['']
          },
          errors: {
            apiKey: null,
            userList: errorMessages.userList
          }
        }
      }
    })

    jest.spyOn(ToastContext, 'useToastContext').mockImplementation(():any => {
      return {
        dispatch: toastDispatchMock
      }
    })

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 3,
        SetNextProgress: setNextProgressMock
      }
    })

    mount(<SettingsConfirm />)

    expect(toastDispatchMock).toBeCalledWith({
      type: 'PUSH_NOTIFICATION',
      payload: {
        message: errorMessages.userList
      }
    })

    jest.runAllTimers()

    expect(setNextProgressMock).toBeCalledWith(2)
  })

  it('should next progress when click done when full apiKey and userList', (done) => {
    const apiKey = 'test'
    const userList = ['test1', 'test2']
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: apiKey,
            userList: userList
          },
          errors: {
            apiKey: null,
            userList: null
          }
        }
      }
    })

    const nextMock = jest.fn()
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 3,
        Next: nextMock
      }
    })


    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() }
    const wrapper = mount(
      <Router history={historyMock}>
        <SettingsConfirm />
      </Router>
    )

    const button = wrapper.find(sel('done'))
    act(() => {
      button.simulate('click')
    })

    setImmediate(() => {
      expect(nextMock).toBeCalled()
      jest.runAllTimers()
      expect(historyMock.push.mock.calls[0][0]).toEqual('/')
      done()
    })
  })
})