import { renderHook, act } from '@testing-library/react-hooks';
import { useToast } from './Toast.hook';

describe('[CUSTOM HOOK] useToast', () => {
  it('initial notification', () => {

    const { result } = renderHook(() => useToast())

    expect(result.current.state.notifications).toEqual([])
  })

  it('push notifications', () => {
    const { result } = renderHook(() => useToast())

    act(() => result.current.dispatch({
      type: 'PUSH_NOTIFICATION',
      payload: {
        message: 'test1'
      }
    }))

    act(() => result.current.dispatch({
      type: 'PUSH_NOTIFICATION',
      payload: {
        message: 'test2'
      }
    }))

    expect(result.current.state.notifications).toEqual(['test1', 'test2'])
  })

  it('pop notifications', () => {
    const { result } = renderHook(() => useToast(['test1', 'test2']))

    act(() => result.current.dispatch({
      type: 'POP_NOTIFICATION',
      payload: {
        index: 0
      }
    }))
    expect(result.current.state.notifications).toEqual(['test2'])
  })
})