import React from 'react'
import ReactDOM from 'react-dom'
import { Toast } from './Toast.component'
import * as ToastContext from './Toast.context'
import { shallow } from 'enzyme'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[HOOK COMPONENTS] Toast', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Toast/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should chnaged toast', () => {
    const dispatchMock = jest.fn();

    jest.spyOn(ToastContext, 'useToastContext').mockImplementation(():any => {
      return {
        state: {
          notifications: ['test1', 'test2']
        },
        dispatch: dispatchMock,
      }
    })

    const wrapper = shallow(<Toast />)
    const toast = wrapper.find(sel('toast'))
    expect(toast.length).toBe(2)
    expect(toast.at(0).text()).toBe('test1')
    expect(toast.at(1).text()).toBe('test2')
  })

  it('should dismiss toast', () => {
    const dispatchMock = jest.fn();

    jest.spyOn(ToastContext, 'useToastContext').mockImplementation(():any => {
      return {
        state: {
          notifications: ['test1', 'test2']
        },
        dispatch: dispatchMock,
      }
    })

    const wrapper = shallow(<Toast />)
    const toast = wrapper.find(sel('toast'))
    toast.at(0).simulate('click')
    
    expect(dispatchMock).toBeCalledWith({
      type: 'POP_NOTIFICATION',
      payload: {
        index: 0
      }
    })
  })
})