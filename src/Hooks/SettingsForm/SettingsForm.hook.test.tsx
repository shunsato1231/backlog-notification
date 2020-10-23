import React from 'react'
import ReactDOM from 'react-dom'
import { renderHook, act } from '@testing-library/react-hooks';
import { useSettingsForm, errorMessages } from './SettingsForm.hook';
import { SettingsFormProvider } from './SettingsForm.context';
import { ImageUser } from '../../Components/organisms/UserSelect/UserSelect.component';

describe('[CUSTOM HOOK] useSettings', () => {
  it('provider renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SettingsFormProvider
      spaceId={''}
      apiKey={''}
      spaceName={''}
      userList={[null]}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('validate initial', () => {
    const { result } = renderHook(() => useSettingsForm())

    expect(result.current.state.errors.spaceId).toEqual(errorMessages.spaceId)
    expect(result.current.state.errors.apiKey).toEqual(errorMessages.apiKey)
    expect(result.current.state.errors.spaceName).toEqual('')
    expect(result.current.state.errors.apiKey).toEqual(errorMessages.apiKey)
  })

  it('validate spaceId', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', spaceName: '', userList: [null]}))

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
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', spaceName: '',  userList: [null]}))

    act(() => result.current.dispatch({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: '',
      }
    }))
    expect(result.current.state.inputs.apiKey).toEqual('')
    expect(result.current.state.errors.apiKey).toEqual(errorMessages.apiKey)

    const testApiKey = 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggg'
    act(() => result.current.dispatch({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: testApiKey
      }
    }))
    expect(result.current.state.inputs.apiKey).toEqual(testApiKey)
    expect(result.current.state.errors.apiKey).toEqual(null)
  })

  it('change spaceName and errorMessages', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', spaceName: '',  userList: [null]}))
    const name = 'spaceName'
    const error = 'error!!!'

    act(() => result.current.dispatch({
      type: 'CHANGE_SPACE_NAME',
      payload: {
        name: name,
        error: error
      }
    }))
    expect(result.current.state.inputs.spaceName).toEqual(name)
    expect(result.current.state.errors.spaceName).toEqual(error)
  })

  it('validate userList', () => {
    const user1:ImageUser = {
      id: 0,
      userId: '',
      name: '',
      roleType: 0,
      lang: '',
      mailAddress: '',
      nulabAccount: null,
      iconImage: ''
    }

    const user2:ImageUser = {
      id: 0,
      userId: '',
      name: 'test user',
      roleType: 0,
      lang: '',
      mailAddress: '',
      nulabAccount: null,
      iconImage: ''
    }

    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', spaceName: '', userList: [null, user1]}))

    act(() => result.current.dispatch({
      type: 'CHANGE_USER_LIST',
      payload: {
        user: user1,
        index: 0
      }
    }))
    expect(result.current.state.inputs.userList[0]).toEqual(user1)
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
          user: user2,
          index: 0
        }
      })
    })
    expect(result.current.state.inputs.userList[0]).toEqual(user2)
    expect(result.current.state.errors.userList).toEqual(null)

    
  })

  it('push userList', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', spaceName: '',  userList: [null]}))
    expect(result.current.state.inputs.userList.length).toBe(1)

    act(() => result.current.dispatch({
      type: 'PUSH_USER_LIST'
    }))
    expect(result.current.state.inputs.userList.length).toBe(2)
  })

  it('pop userList', () => {
    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', spaceName:'', userList: [null, null, null]}))
    expect(result.current.state.inputs.userList.length).toBe(3)

    act(() => result.current.dispatch({
      type: 'POP_USER_LIST',
      payload: {
        index: 0
      }
    }))
    expect(result.current.state.inputs.userList.length).toBe(2)
    expect(result.current.state.errors.userList).toEqual(errorMessages.userList)

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

  it('delete empty userList', () => {
    const user:ImageUser = {
      id: 0,
      userId: '',
      name: 'test user',
      roleType: 0,
      lang: '',
      mailAddress: '',
      nulabAccount: null,
      iconImage: ''
    }

    const { result } = renderHook(() => useSettingsForm({spaceId: '', apiKey: '', spaceName: '',  userList: [null, user, null]}))

    act(() => result.current.dispatch({
      type: 'DELETE_EMPTY_USER_LIST'
    }))
    expect(result.current.state.inputs.userList.length).toBe(1)
  })
})