import { renderHook } from "@testing-library/react-hooks"
import useResizeObserver from './ResizeObserver.hook'

const mockResizeObserverPolyfillObserve = jest.fn()
jest.mock('resize-observer-polyfill', () => {
  return jest.fn().mockImplementation(() => ({
    observe: (ref) => {
      mockResizeObserverPolyfillObserve(ref)
    },
    disconnect: () => {
    }
  }))
})

describe('[HOOK] useResizeObserver', () => {
  interface ResizeEvent {
    contentRect?: { width: number; height?: number }
  }

  let callback: (e: ResizeEvent[]) => any

  const mockResizeObserverObserve = jest.fn()
  const mockResizeObserverDisconnect = jest.fn()
  const mockResizeObserver = jest.fn((cb) => ({
    observe: (arg: any) => {
      callback = cb
      mockResizeObserverObserve(arg)
    },
    disconnect: () => mockResizeObserverDisconnect()
  }))


  const triggerObserverCb = (e: ResizeEvent) => {
    callback([e])
  }

  beforeAll(() => {
    globalThis.ResizeObserver = mockResizeObserver
  })

  afterEach(() => {
    jest.clearAllMocks()
    callback = null
  })

  it('call observe and set callback when set ref and callback', () => {
    const mockRef = { current: document.createElement("div") }
    const mockFn = jest.fn()
    renderHook(() => useResizeObserver(mockRef, mockFn))

    expect(mockResizeObserverObserve).toBeCalledWith(mockRef.current)
    const contentRect = { bottom: 100, left: 100, width: 200 }
    callback([{contentRect}])
    expect(mockFn).toBeCalledWith(contentRect)
  })

  it('not call observe when not set ref', () => {
    const mockRef = { current: null }
    renderHook(() => useResizeObserver(mockRef, jest.fn()))

    expect(mockResizeObserverObserve).not.toBeCalled()
  })

  it('call callback when resize and set ref and callback', () => {
    const mockRef = { current: document.createElement("div") }
    const mockCallBack = jest.fn()
    renderHook(() => useResizeObserver(mockRef, mockCallBack))

    const contentRect = { bottom: 100, left: 100, width: 200 }
    triggerObserverCb({contentRect})

    expect(mockCallBack).toBeCalledWith(contentRect)
  })

  it('not crash when not set callback', () => {
    const mockRef = { current: document.createElement("div") }
    renderHook(() => useResizeObserver(mockRef, null))

    const contentRect = { bottom: 100, left: 100, width: 200 }
    triggerObserverCb({contentRect})
  })

  it('set resize observer polyfill when Non-compliant browser', () => {
    globalThis.ResizeObserver = null
    const mockRef = { current: document.createElement("div") }
    const mockCallBack = jest.fn()
  
    renderHook(() => useResizeObserver(mockRef, mockCallBack))

    expect(mockResizeObserverObserve).not.toBeCalled()
    expect(mockResizeObserverPolyfillObserve.mock.calls[0][0]).toEqual(mockRef.current)
  })

})