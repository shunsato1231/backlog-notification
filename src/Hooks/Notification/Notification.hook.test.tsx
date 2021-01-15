import { renderHook, act } from '@testing-library/react-hooks'
import { useNotification, errorMessages } from './Notification.hook'
import * as firebase from '../Firebase/Firebase.hook'
import MessagingMock from '../../../test_helpers/firebase/messaging.mock'
import axios, { AxiosRequestConfig } from 'axios'

jest.mock('axios')
const axiosMock = axios as any

describe('[CUSTOM HOOK] useNotification', () => {
  const messagingMock = new MessagingMock
  const testNotificationKey = 'APA91bGHXQBB...9QgnYOEURwm0I3lmyqzk2TXQ'
  let initial: boolean = false

  // mock serviceWorker
  Object.defineProperty(window.navigator, 'serviceWorker', {
    value: {
      register: jest.fn(),
      ready: Promise.resolve()
    }
  })

  let mockCreateTokenGroupFlag: boolean // 初回読み込み時のみ成功
  let mockGetNotificationKeyFlag: boolean
  let mockAddTokenGropuFlag: boolean

  beforeEach(() => {
    mockCreateTokenGroupFlag = false // 初回読み込み時のみ成功
    mockGetNotificationKeyFlag = true
    mockAddTokenGropuFlag = true

    type axiosMethods = 'createTokenGroup' | 'getNotificationKey' | 'addTokenGrop' | 'error'

    // mock axios
    axiosMock.mockImplementation((request: AxiosRequestConfig):any => {
      const method: axiosMethods
        = request.data.operation === 'create' ? 'createTokenGroup'
        : request.method         === 'GET'    ? 'getNotificationKey'
        : request.data.operation === 'add'    ? 'addTokenGrop'
        : 'error'

      switch (method) {
        case 'createTokenGroup':
          return mockCreateTokenGroupFlag
            ? Promise.resolve({data: { 'notification_key': testNotificationKey }})
            : Promise.reject('mock Error')
        case 'getNotificationKey':
          return mockGetNotificationKeyFlag
            ? Promise.resolve({data: { 'notification_key': testNotificationKey }})
            : Promise.reject('mock Error')
        case 'addTokenGrop':
          return mockAddTokenGropuFlag
            ? Promise.resolve({data: { 'notification_key': testNotificationKey }})
            : Promise.reject('mock Error')
        case 'error':
            return null
      }
    })

    // mock messaging
    jest.spyOn(firebase, 'useFirebase').mockImplementation(():any => {
      return {
        messaging: messagingMock,
        initializeApp: initial
      }
    })
  })

  afterEach(() => {
    axiosMock.mockReset()
    messagingMock.reset()
  })

  it('setting notification when initial loading', async () => {
    initial = true
    mockCreateTokenGroupFlag = true
    messagingMock.mockGetTokenReturn = 'testToken'

    const {result, waitForNextUpdate} = renderHook(() => useNotification('uid'))
    await act(async () => {
      await waitForNextUpdate()

      let load_event = document.createEvent("HTMLEvents")
      load_event.initEvent("load", true, true)
      window.document.dispatchEvent(load_event)
    })
    // serviceworker
    expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/firebase-messaging-sw.js')
    expect(messagingMock.mockUseServiceWorker).toHaveBeenCalled()
    expect(messagingMock.mockUsePublicVapidKey).toHaveBeenCalled()

    // notification
    expect(messagingMock.mockRequestPermission).toHaveBeenCalled()
    expect(messagingMock.mockGetToken).toHaveBeenCalled()
    expect(axiosMock.mock.calls[0][0]).toEqual(expect.objectContaining({
      method: "POST",
      url: expect.any(String),
      data: {
        "operation": "create",
        "notification_key_name": expect.any(String),
        "registration_ids": expect.any(Array)
      },
      headers: expect.any(Object),
      withCredentials: expect.any(Boolean)
    }))
    expect(axiosMock.mock.results[0].value).resolves.toEqual({data: {'notification_key': testNotificationKey}})

    expect(result.current.isError).toEqual(null)
    expect(result.current.notificationKey).toEqual(testNotificationKey)
  })

  it('setting notification when from the second time loading', async () => {
    messagingMock.mockGetTokenReturn = 'testToken'

    const {result, waitForNextUpdate} = renderHook(() => useNotification('uid'))
    await act(async () => { await waitForNextUpdate() })

    // notification
    expect(messagingMock.mockRequestPermission).toHaveBeenCalled()
    expect(messagingMock.mockGetToken).toHaveBeenCalled()
    expect(axiosMock.mock.calls[0][0]).toEqual(expect.objectContaining({
      method: "POST",
      url: expect.any(String),
      data: {
        "operation": "create",
        "notification_key_name": expect.any(String),
        "registration_ids": expect.any(Array)
      },
      headers: expect.any(Object),
      withCredentials: expect.any(Boolean)
    }))
    expect(axiosMock.mock.results[0].value).rejects.toEqual('mock Error')
    expect(axiosMock.mock.calls[1][0]).toEqual(expect.objectContaining({
      method: "GET",
      url: expect.any(String),
      headers: expect.any(Object),
      data: expect.any(Object)
    }))
    expect(axiosMock.mock.results[1].value).resolves.toEqual({data: {'notification_key': testNotificationKey}})
    expect(axiosMock.mock.calls[2][0]).toEqual(expect.objectContaining({
      method: "POST",
      url: expect.any(String),
      data: {
        "operation": "add",
        "notification_key_name": expect.any(String),
        "notification_key": expect.any(String),
        "registration_ids": expect.any(Array)
      },
      headers: expect.any(Object),
      withCredentials: expect.any(Boolean)
    }))
    expect(axiosMock.mock.results[2].value).resolves.toEqual({data: {'notification_key': testNotificationKey}})

    expect(result.current.isError).toBe(null)
    expect(result.current.notificationKey).toEqual(testNotificationKey)
  })

  it('push isError when cant allow permission', async () => {
    messagingMock.mockRequestPermissionFlag = false

    const {result, waitForNextUpdate} = renderHook(() => useNotification('uid'))
    await act(async () => { await waitForNextUpdate() })

    expect(result.current.isError).toEqual(errorMessages.permission)
    expect(result.current.notificationKey).toEqual(null)
  })

  it('push isError when cant get token', async () => {
    initial = false
    messagingMock.mockGetTokenFlag = false

    const {result, waitForNextUpdate} = renderHook(() => useNotification('uid'))
    await act(async () => { await waitForNextUpdate() })

    expect(result.current.isError).toEqual(errorMessages.token)
    expect(result.current.notificationKey).toEqual(null)
  })

  it('push isError when cant get notification key', async () => {
    mockGetNotificationKeyFlag = false

    const {result, waitForNextUpdate} = renderHook(() => useNotification('uid'))
    await act(async () => { await waitForNextUpdate() })

    expect(result.current.isError).toEqual(errorMessages.getNotificationKey)
    expect(result.current.notificationKey).toEqual(null)
  })

  it('push isError when cant add token group', async () => {
    mockAddTokenGropuFlag = false

    const {result, waitForNextUpdate} = renderHook(() => useNotification('uid'))
    await act(async () => { await waitForNextUpdate() })

    expect(result.current.isError).toEqual(errorMessages.addTokenGroup)
    expect(result.current.notificationKey).toEqual(null)
  })
})