import React from 'react'
import ReactDOM from 'react-dom'
import { renderHook, act } from '@testing-library/react-hooks';
import { useSettingsForm, errorMessages } from './SettingsForm.hook';
import { SettingsFormProvider } from './SettingsForm.context';

describe('[CUSTOM HOOK] useSettings', () => {
  it('provider renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SettingsFormProvider
      spaceId={''}
      apiKey={''}
      userList={['']}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('validate initial', () => {
    const { result } = renderHook(() => useSettingsForm())

    expect(result.current.state.errors.apiKey).toEqual(errorMessages.apiKey)
    expect(result.current.state.errors.userList).toEqual(errorMessages.userList)
  })

  it('validate spaceId', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', userList: ['']}))

    act(() => result.current.dispatch({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: '',
      }
    }))
    expect(result.current.state.inputs.spaceId).toEqual('')
    expect(result.current.state.errors.spaceId).toEqual(errorMessages.spaceId)

    act(() => result.current.dispatch({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: 'test'
      }
    }))
    expect(result.current.state.inputs.spaceId).toEqual('test')
    expect(result.current.state.errors.spaceId).toEqual(null)

    act(() => result.current.dispatch({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: 'testあああ'
      }
    }))
    expect(result.current.state.inputs.spaceId).toEqual('testあああ')
    expect(result.current.state.errors.spaceId).toEqual(errorMessages.spaceId)
  })

  it('validate apiKey', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', userList: ['']}))

    act(() => result.current.dispatch({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: '',
      }
    }))
    expect(result.current.state.inputs.apiKey).toEqual('')
    expect(result.current.state.errors.apiKey).toEqual(errorMessages.apiKey)

    act(() => result.current.dispatch({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: 'test apiKey'
      }
    }))
    expect(result.current.state.inputs.apiKey).toEqual('test apiKey')
    expect(result.current.state.errors.apiKey).toEqual(null)
  })

  it('validate userList', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', userList: ['', '']}))

    act(() => result.current.dispatch({
      type: 'CHANGE_USER_LIST',
      payload: {
        userName: '',
        index: 0
      }
    }))
    expect(result.current.state.inputs.userList[0]).toEqual('')
    expect(result.current.state.errors.userList).toEqual(errorMessages.userList)

    act(() => {
      result.current.dispatch({
        type: 'POP_USER_LIST',
        payload: {
          index: 0
        }
      })

      result.current.dispatch({
        type: 'CHANGE_USER_LIST',
        payload: {
          userName: 'test',
          index: 0
        }
      })
    })
    expect(result.current.state.inputs.userList[0]).toEqual('test')
    expect(result.current.state.errors.userList).toEqual(null)

    
  })

  it('push userList', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', userList: ['']}))
    expect(result.current.state.inputs.userList.length).toBe(1)

    act(() => result.current.dispatch({
      type: 'PUSH_USER_LIST'
    }))
    expect(result.current.state.inputs.userList.length).toBe(2)
  })

  it('pop userList', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', userList: ['', '', 'test user']}))
    expect(result.current.state.inputs.userList.length).toBe(3)

    act(() => result.current.dispatch({
      type: 'POP_USER_LIST',
      payload: {
        index: 0
      }
    }))
    expect(result.current.state.inputs.userList.length).toBe(2)
    expect(result.current.state.errors.userList).toEqual(null)

    act(() => result.current.dispatch({
      type: 'POP_USER_LIST',
      payload: {
        index: 1
      }
    }))
    expect(result.current.state.inputs.userList.length).toBe(1)
    expect(result.current.state.errors.userList).toEqual(errorMessages.userList)

    act(() => result.current.dispatch({
      type: 'POP_USER_LIST',
      payload: {
        index: 0
      }
    }))
    expect(result.current.state.inputs.userList.length).toBe(0)
    expect(result.current.state.errors.userList).toEqual(errorMessages.userList)
  })
})