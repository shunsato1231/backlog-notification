import React from 'react'
import ReactDOM from 'react-dom'
import * as SettingsFormContext from '../../../Hooks/SettingsForm/SettingsForm.context'
import { SetUserList } from './SetUserList.component'
import { shallow, mount } from 'enzyme'
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] SetUserList', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SetUserList />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should show delete button when userList.length > 1', ()=> {
    const dispatchMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            userList: ['user1', 'user2']
          },
          errors: {
            userList: null
          }
        },
        dispatch: dispatchMock
      }
    })    

    const wrapper = shallow(<SetUserList/>)

    const deleteButtons = wrapper.find(sel('delete'))
    expect(deleteButtons.length).toBe(2)

    deleteButtons.at(0).simulate('click')
    expect(dispatchMock).toBeCalledWith({
      type: 'POP_USER_LIST',
      payload: {
        index: 0
      }
    })
  })

  it('should hidden delete button when userList.length < 1', ()=> {
    const dispatchMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            userList: ['user1']
          },
          errors: {
            userList: null
          }
        },
        dispatch: dispatchMock
      }
    })    

    const wrapper = shallow(<SetUserList/>)

    const deleteButtons = wrapper.find(sel('delete'))
    expect(deleteButtons.length).toBe(0)
  })

  it('should show add button when userList.length < 5', ()=> {
    const dispatchMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            userList: ['user1', 'user2', 'user3', 'user4']
          },
          errors: {
            userList: null
          }
        },
        dispatch: dispatchMock
      }
    })

    const wrapper = shallow(<SetUserList/>)
    const addButtons = wrapper.find(sel('add'))

    expect(addButtons.length).toBe(1)

    addButtons.at(0).simulate('click')
    expect(dispatchMock).toBeCalledWith({
      type: 'PUSH_USER_LIST',
    })
  })

  it('should hidden add button when userList.length < 5', ()=> {
    const dispatchMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            userList: ['user1', 'user2', 'user3', 'user4', 'user5']
          },
          errors: {
            userList: null
          }
        },
        dispatch: dispatchMock
      }
    })

    const wrapper = shallow(<SetUserList/>)
    const addButtons = wrapper.find(sel('add'))

    expect(addButtons.length).toBe(0)
  })

  it('should change userList when input changes', ()=> {
    const dispatchMock = jest.fn()

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            userList: ['user1', 'user2', 'user3', 'user4', 'user5']
          },
          errors: {
            userList: null
          }
        },
        dispatch: dispatchMock
      }
    })

    const wrapper = mount(<SetUserList/>)
    const inputs = wrapper.find(sel('input'))
    inputs.at(0).simulate('change', {target: {value: 'abc'}})
  
    expect(dispatchMock).toBeCalledWith({
      type: 'CHANGE_USER_LIST',
      payload: {
        userName: 'abc',
        index: 0
      }
    })
  })

  it('should go next step when input userList', () => {
    const mockNext = jest.fn()
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            userList: ['test']
          },
          errors: {
            userList: ''
          }
        }
      }
    })

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: mockNext
      }
    })

    const wrapper = shallow(<SetUserList />)
    wrapper.find(sel('next')).simulate('click')
    expect(mockNext).toBeCalled()
  })

  it('should progress back when click back button', () => {
    const mockPrev = jest.fn()
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Prev: mockPrev
      }
    })

    const wrapper = shallow(<SetUserList />)
    wrapper.find(sel('back')).simulate('click')
    expect(mockPrev).toBeCalled()
  })
})