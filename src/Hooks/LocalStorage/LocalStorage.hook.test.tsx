import { renderHook } from "@testing-library/react-hooks"
import { useLocalStorage } from './LocalStorage.hook'

describe('[CUSTOM HOOK] useLocalStorage', () => {
  it('should set value in localStorage', () => {
    const {result} = renderHook(() => useLocalStorage('user', null))
    // setting value
    result.current[1]('changed_userName')
    expect(result.current[0]).toEqual('changed_userName')
  })

  it('should return localStorage value when localstorage value convertible (ignore initial value)', () => {
    const key = 'test'
    window.localStorage.setItem(key, '{"foo" : 1 }')

    const {result} = renderHook(() => useLocalStorage(key, 'initial value'))
    expect(result.current[0]).toEqual({"foo" : 1 })
  })

  it('should return initial value when localstorage value not convertible', () => {
    const key = 'test'
    window.localStorage.setItem(key, '{"foo" : 1, }')
    const {result} = renderHook(() => useLocalStorage(key, null))

    expect(result.current[0]).toEqual(null)
  })

  it('should execute the function with the localStorage value as an argument when set a function', () => {
    const {result} = renderHook(() => useLocalStorage('user', null))
    result.current[1](100)
    // setting value
    result.current[1]((val)=>{return val + 100})
    expect(result.current[0]).toEqual(200)
  })

  it('should catch JSON.stringify errors', () => {
    const {result} = renderHook(() => useLocalStorage('user', null))
    let data = { a : 'a', b : {c : 'c'} }
    data['d'] = data

    // setting value
    result.current[1](data)
    expect(result.current[0]).toEqual(data)
  })
})