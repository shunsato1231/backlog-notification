import React from 'react'
import ReactDOM from 'react-dom'
import { SetApiKey } from './SetApiKey.component'
import * as SettingsFormContext from '../../../Hooks/SettingsForm/SettingsForm.context'
import { mount, shallow } from 'enzyme'
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] SetApiKey', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SetApiKey/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should chnaged settings form status', () => {
    const dispatchMock = jest.fn();

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: 'test Key'
          },
          errors: {
            apiKey: ''
          }
        },
        dispatch: dispatchMock,
      }
    })

    const wrapper = mount(<SetApiKey />)
    const input = wrapper.find(sel('input'))
    input.simulate('change')
    expect(dispatchMock).toBeCalledWith({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: 'test Key'
      }
    })
  })

  it('should go next step when input apiKey', () => {
    const mockNext = jest.fn()
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: 'test Key'
          },
          errors: {
            apiKey: ''
          }
        }
      }
    })

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: mockNext
      }
    })

    const wrapper = shallow(<SetApiKey />)
    wrapper.find(sel('button')).simulate('click')
    expect(mockNext).toBeCalled()
  })

  it('should next button disabled when uninput apiKey', () => {
    const mockNext = jest.fn()
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: ''
          },
          errors: {
            apiKey: 'error'
          }
        }
      }
    })

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: mockNext
      }
    })

    const wrapper = shallow(<SetApiKey />)
    expect(wrapper.find(sel('button')).get(0).props.disabled).toBe(true)
    
  })
})