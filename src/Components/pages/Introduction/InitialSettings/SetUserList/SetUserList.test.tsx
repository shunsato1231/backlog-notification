import React from 'react'
import ReactDOM from 'react-dom'
import * as SettingsFormContext from '../../../../../Hooks/SettingsForm/SettingsForm.context'
import { SetUserList } from './SetUserList.component'
import { shallow, mount } from 'enzyme'
import * as ProgressContext from '../../../../../Hooks/Progress/Progress.context'
import * as BacklogApi from '../../../../../Hooks/BacklogApi/BacklogApi.hook'
import * as ToastContext from '../../../../../Hooks/Toast/Toast.context'
import { act } from '@testing-library/react-hooks'
import { User } from '../../../../../Hooks/BacklogApi/backlogApiTypes'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[PAGES] SetUserList', ()=> {
  jest.useFakeTimers()
  const dummyUsers: User[] = [
    {
      "id": 111, 
      "userId": '111', 
      "name": 'test1', 
      "roleType": 1, 
      "lang": 'jp', 
      "mailAddress": 'test@hoge.com',
      "nulabAccount": null
    },
    {
      "id": 222, 
      "userId": '222', 
      "name": 'test2', 
      "roleType": 1, 
      "lang": 'jp', 
      "mailAddress": 'test@hoge.com',
      "nulabAccount": null
    },
    {
      "id": 333, 
      "userId": '333', 
      "name": 'test3', 
      "roleType": 1, 
      "lang": 'jp', 
      "mailAddress": 'test@hoge.com',
      "nulabAccount": {id: 'nulab_tarou'}
    }
  ]

  const dummyIcon: string = 'test'

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

  it('should go prev step when empty spaceName', async (done) => {
    const setNextProgressMock = jest.fn()
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 2,
        SetNextProgress: setNextProgressMock
      }
    })

    const toastDispatchMock = jest.fn()
    jest.spyOn(ToastContext, 'useToastContext').mockImplementation(():any => {
      return {
        dispatch: toastDispatchMock
      }
    })

    let wrapper
    await act(async () => {
      wrapper = mount(<SetUserList/>, { attachTo: document.body })
      jest.runAllTimers()
    })
    wrapper.update()

    expect(toastDispatchMock).toBeCalledWith({
      type: 'PUSH_NOTIFICATION',
      payload: {
        message: 'API Keyの登録が完了していません'
      }
    })

    setImmediate(() => {
      jest.runAllTimers()
      expect(setNextProgressMock).toBeCalledWith(1)
      done()
    })
  })

  it('should change userList when input changes', async ()=> {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 2
      }
    })

    const mockGetUsers = jest.fn(() => Promise.resolve(dummyUsers))
    const mockGetUserIcon = jest.fn(() => Promise.resolve(dummyIcon))
    jest.spyOn(BacklogApi, 'useBacklogApi').mockImplementation(():any => {
      return {
        getUsers: mockGetUsers,
        getUserIcon: mockGetUserIcon
      }
    })
  
    const dispatchMock = jest.fn()
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceName: 'test',
            userList: [null]
          },
          errors: {
            userList: null
          }
        },
        dispatch: dispatchMock
      }
    })

    let wrapper
    await act(async () => {
      wrapper = mount(<SetUserList/>)
    })
    wrapper.update()
    
    const selects = wrapper.find(sel('select'))
    selects.at(0).find('li').at(0).simulate('click')

    expect(dispatchMock).toBeCalledWith({
      type: 'CHANGE_USER_LIST',
      payload: {
        user: {
          ...dummyUsers[0],
          iconImage: dummyIcon
        },
        index: 0
      }
    })
  })

  it('should no load icon image when already loaded', async () => {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 2
      }
    })

    const mockGetUsers = jest.fn(() => Promise.resolve(dummyUsers))
    const mockGetUserIcon = jest.fn(() => Promise.resolve(dummyIcon))
    jest.spyOn(BacklogApi, 'useBacklogApi').mockImplementation(():any => {
      return {
        getUsers: mockGetUsers,
        getUserIcon: mockGetUserIcon
      }
    })

    let wrapper
    await act(async () => {
      wrapper = mount(<SetUserList/>)
    })
    wrapper.update()

    mockGetUserIcon.mockClear()
    const select = wrapper.find(sel('select')).at(0)
    select.prop('onAppear')({
      ...dummyUsers[0],
      iconImage: dummyIcon
    })

    expect(mockGetUserIcon).not.toBeCalled()
  })

  it('should go next step when input userList', () => {
    const settingsDispatchMock = jest.fn()
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            userList: ['test']
          },
          errors: {
            userList: ''
          }
        },
        dispatch: settingsDispatchMock
      }
    })

    const mockNext = jest.fn()
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: mockNext
      }
    })

    const wrapper = shallow(<SetUserList />)
    wrapper.find(sel('next')).simulate('click')
    expect(mockNext).toBeCalled()
    expect(settingsDispatchMock).toBeCalledWith({
      type: 'DELETE_EMPTY_USER_LIST'
    })
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