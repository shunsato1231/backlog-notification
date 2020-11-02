 /* istanbul ignore file */

interface IMessagingMock {
  mockUseServiceWorker: jest.Mock;
  _mockUseServiceWorkerFlag: boolean
  mockUsePublicVapidKey: jest.Mock;
  _mockUsePublicVapidKeyFlag: boolean
  mockRequestPermission: jest.Mock;
  _mockRequestPermissionFlag: boolean
  mockGetToken: jest.Mock;
  _mockGetTokenFlag: boolean
  _mockGetTokenReturn: string;
}

export default class MessagingMock implements IMessagingMock {
  _mockError: string
  mockUseServiceWorker: jest.Mock;
  _mockUseServiceWorkerFlag: boolean
  mockUsePublicVapidKey: jest.Mock;
  _mockUsePublicVapidKeyFlag: boolean
  mockRequestPermission: jest.Mock;
  _mockRequestPermissionFlag: boolean
  mockGetToken: jest.Mock;
  _mockGetTokenFlag: boolean
  _mockGetTokenReturn: string;

  constructor () {
    // error message
    this._mockError = 'Mockerror!!'

    // init flag
    this._mockUseServiceWorkerFlag = true
    this._mockUsePublicVapidKeyFlag = true
    this._mockRequestPermissionFlag = true
    this._mockGetTokenFlag = true

    // methods that return promises
    this.mockUseServiceWorker = jest.fn(() =>
      this._mockUseServiceWorkerFlag
        ? Promise.resolve()
        : Promise.reject(this._mockError)
    )
    this.mockUsePublicVapidKey = jest.fn(() =>
      this._mockUsePublicVapidKeyFlag
        ? Promise.resolve()
        : Promise.reject(this._mockError)
    )
    this.mockRequestPermission = jest.fn(() =>
      this._mockRequestPermissionFlag
        ? Promise.resolve()
        : Promise.reject(this._mockError)
    )
    this.mockGetToken = jest.fn(() => 
      this._mockGetTokenFlag
        ? Promise.resolve(this._mockGetTokenReturn)
        : Promise.reject(this._mockError)
    )

    // return values
     this._mockGetTokenReturn = null
  }

  /* 
    useServiceWorker
  */
  useServiceWorker(r: ServiceWorkerRegistration) {
    return this.mockUseServiceWorker(r)
  }

  set mockUseServiceWorkerFlag(b: boolean) {
    this._mockUseServiceWorkerFlag = b
  }


  /* 
    useServiceWorker
  */
  usePublicVapidKey(k: string) {
    return this.mockUsePublicVapidKey(k)
  }

  set mockUsePublicVapidKeyFlag(b: boolean) {
    this._mockUsePublicVapidKeyFlag = b
  }

  /*
    requestPermittion
  */
  requestPermission() {
    return this.mockRequestPermission()
  }
  set mockRequestPermissionFlag(b: boolean) {
    this._mockRequestPermissionFlag = b
  }

  /*
    getToken
  */
  getToken() {
    return this.mockGetToken()
  }

  set mockGetTokenFlag(b: boolean) {
    this._mockGetTokenFlag = b
  }

  set mockGetTokenReturn(val: string) {
    this._mockGetTokenReturn = val
  }

  reset() {
    this.mockUseServiceWorker.mockClear()
    this.mockUsePublicVapidKey.mockClear()
    this.mockRequestPermission.mockClear()
    this.mockGetToken.mockClear()

    // return values
    this._mockGetTokenReturn = null

    // init flag
    this._mockUseServiceWorkerFlag = true
    this._mockUsePublicVapidKeyFlag = true
    this._mockRequestPermissionFlag = true
    this._mockGetTokenFlag = true
  }
}