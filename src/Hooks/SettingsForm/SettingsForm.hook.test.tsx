import { renderHook, act } from '@testing-library/react-hooks';
import { useSettingsForm, errorMessages } from './SettingsForm.hook';

describe('[CUSTOM HOOK] useSettings', () => {
  it('validate initial', () => {

    const { result } = renderHook(() => useSettingsForm())

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
      }
    }))

    expect(result.current.state.errors.apiKey).toEqual(errorMessages.apiKey)
    expect(result.current.state.errors.userList).toEqual(errorMessages.userList)
  })

  it('validate apiKey', () => {

    const { result } = renderHook(() => useSettingsForm({apiKey: '', userList: ['']}))

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
        apiKey: '',
      }
    }))
    expect(result.current.state.inputs.apiKey).toEqual('')
    expect(result.current.state.errors.apiKey).toEqual(errorMessages.apiKey)

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
        apiKey: 'test apiKey'
      }
    }))
    expect(result.current.state.inputs.apiKey).toEqual('test apiKey')
    expect(result.current.state.errors.apiKey).toEqual(null)

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
      }
    }))
    expect(result.current.state.inputs.apiKey).toEqual('test apiKey')
    expect(result.current.state.errors.apiKey).toEqual(null)
  })

  it('validate userList', () => {
    const { result } = renderHook(() => useSettingsForm({apiKey: '', userList: ['']}))

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
        userList: [''],
      }
    }))
    expect(result.current.state.inputs.userList[0]).toEqual('')
    expect(result.current.state.errors.userList).toEqual(errorMessages.userList)

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
        userList: ['test user1']
      }
    }))
    expect(result.current.state.inputs.userList[0]).toEqual('test user1')
    expect(result.current.state.errors.userList).toEqual(null)

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
      }
    }))
    expect(result.current.state.inputs.userList.filter(Boolean)[0]).toEqual('test user1')
    expect(result.current.state.errors.userList).toEqual(null)

    act(() => result.current.dispatch({
      type: 'CHANGE_SETTINGS',
      payload: {
        userList: ['', 'test user1', 'test user2']
      }
    }))
    expect(result.current.state.inputs.userList.filter(Boolean)[0]).toEqual('test user1')
    expect(result.current.state.inputs.userList.filter(Boolean)[1]).toEqual('test user2')
    expect(result.current.state.errors.userList).toEqual(null)
  })
})