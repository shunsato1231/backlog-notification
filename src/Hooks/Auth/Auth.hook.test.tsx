import React from 'react'
import ReactDOM from 'react-dom'
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from './Auth.hook';
import * as firebase from '../Firebase/Firebase.hook'
import FirestoreMock from '../../test_helpers/firebase/firestore.mock';
import AuthMock from '../../test_helpers/firebase/auth.mock';
import { AuthProvider } from './Auth.context';

describe('[CUSTOM HOOK] useAuth', () => {
  const firestoreMock = new FirestoreMock
  const authMock = new AuthMock

  beforeEach(() => {
    jest.spyOn(firebase, 'useFirebase').mockImplementation(():any => {
      return {
        auth: authMock,
        database: firestoreMock
      }
    })

    firestoreMock.reset()
    authMock.reset()
  })

  it('provider renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AuthProvider/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('set apikey', () => {
    const { result } = renderHook(() => useAuth())
    const apiKey = 'testKey'
    firestoreMock.mockSetReturn = { id: 'test-id' }

    act(() => { result.current.setApiKey(apiKey) })
    expect(result.current.info.apiKey).toEqual(apiKey)
  })

  it('set spaceID', () => {
    const { result } = renderHook(() => useAuth())
    const spaceId = 'testKey'
    firestoreMock.mockSetReturn = { id: 'test-id' }

    act(() => { result.current.setSpaceId(spaceId) })
    expect(result.current.info.spaceId).toEqual(spaceId)
  })

  it('set userList', () => {
    const { result } = renderHook(() => useAuth())
    const userList = [null]
    firestoreMock.mockSetReturn = { id: 'test-id' }

    act(() => {result.current.setUserList(userList)})
    expect(result.current.info.userList).toEqual(userList)
  })

  it('set Notification key', () => {
    const { result } = renderHook(() => useAuth())
    const notificationKey = 'testNotificayionKey'
    firestoreMock.mockSetReturn = { id: 'test-id' }

    act(() => {result.current.setNotificationKey(notificationKey)})
    expect(result.current.info.notificationKey).toEqual(notificationKey)
  })

  it('set uid in local storage when signin', async () => {
    const uid = 'test-uid'
    authMock.mockSignInWithPopupReturn = { user: { uid: uid } }
    authMock.mockOnAuthStateChangedReturn = { user: { uid: uid } }
    firestoreMock.mockGetReturn = {data: () => {
      apiKey: ''
      userList: ['']
      notificationKey: ''
    }}

    const { result } = renderHook(() => useAuth())
    await act(async() => {result.current.signin()})
    expect(result.current.uid).toEqual(uid)
  })

  it('set uid to null in localstorage when signout', async () => {
    firestoreMock.mockGetReturn = {data: () => {
      apiKey: ''
      userList: ['']
      notificationKey: ''
    }}

    const { result } = renderHook(() => useAuth())

    await act(async() => {result.current.signout()})
    expect(result.current.uid).toEqual(null)
  })
})