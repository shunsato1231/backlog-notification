import { renderHook } from '@testing-library/react-hooks';
import firebase from 'firebase/app'

import { useFirebase } from './Firebase.hook';

describe('[CUSTOM HOOK] useFirebase', () => {

  beforeEach(() => {
    jest.spyOn(firebase, 'app').mockImplementation(():any => {
      return jest.fn()
    })

    jest.spyOn(firebase, 'auth').mockImplementation(():any => {
      return jest.fn()
    })

    jest.spyOn(firebase, 'firestore').mockImplementation(():any => {
      return jest.fn()
    })

    jest.spyOn(firebase, 'messaging').mockImplementation(():any => {
      return jest.fn()
    })

    firebase.initializeApp = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('call initializeApp when firebase.apps is not exist', () => {
    jest.spyOn(firebase, 'apps', 'get').mockReturnValue([]);
    renderHook(() => useFirebase())
    expect(firebase.initializeApp).toBeCalled()
  })

  it('not call initializeApp when firebase.apps is exist', () => {
    jest.spyOn(firebase, 'apps', 'get').mockReturnValue([firebase.app()]);
    renderHook(() => useFirebase())
    expect(firebase.initializeApp).not.toBeCalled()
  })

  it('return messaging when supporting', () => {
    firebase.messaging.isSupported = jest.fn(() => true)
    const { result } = renderHook(() => useFirebase())

    expect(result.current.messaging).not.toBe(null)
  })

  it('not return messaging when no supporting', () => {
    firebase.messaging.isSupported = jest.fn(() => false)
    const { result } = renderHook(() => useFirebase())

    expect(result.current.messaging).toBe(null)
  })
})