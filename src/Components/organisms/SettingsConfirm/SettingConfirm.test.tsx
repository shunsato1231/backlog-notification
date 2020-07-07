import React from 'react'
import ReactDOM from 'react-dom'
import { SettingsConfirm, } from './SettingsConfirm.component'
import * as SettingsFormContext from '../../../Hooks/SettingsForm/SettingsForm.context'
import { mount } from 'enzyme'
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'
import * as ToastContext from '../../../Hooks/Toast/Toast.context'
import { errorMessages } from '../../../Hooks/SettingsForm/SettingsForm.hook'


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

  it('should next progress when click done when full apiKey and userList', () => {
    const nextMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: 'test',
            userList: ['test1', 'test2']
          },
          errors: {
            apiKey: null,
            userList: null
          }
        }
      }
    })

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 3,
        Next: nextMock
      }
    })

    let wrapper = mount(<SettingsConfirm />)

    wrapper.find(sel('done')).simulate('click')
    expect(nextMock).toBeCalled()
  })
})