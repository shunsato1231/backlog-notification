// import firebase from 'firebase/app'

interface IAuthMock {
  mockOnAuthStateChanged: jest.Mock,
  mockSignInWithPopup: jest.Mock,
  mockSignOut: jest.Mock,
  _mockOnAuthStateChangedReturn: Object,
  _mockSignInWithPopupReturn: Object
}

export default class AuthMock implements IAuthMock {
  mockOnAuthStateChanged: jest.Mock
  mockSignInWithPopup: jest.Mock
  mockSignOut: jest.Mock
  _mockOnAuthStateChangedReturn: Object
  _mockSignInWithPopupReturn: Object

  constructor () {
    // methods that return promises
    this.mockOnAuthStateChanged = jest.fn(callback => () => callback(this._mockOnAuthStateChangedReturn))
    this.mockSignInWithPopup = jest.fn(() => Promise.resolve(this._mockSignInWithPopupReturn))
    this.mockSignOut = jest.fn(() => Promise.resolve())

    this._mockOnAuthStateChangedReturn = null
    this._mockSignInWithPopupReturn = null
  }

  onAuthStateChanged (callback: Function) {
    return this.mockOnAuthStateChanged(callback)
  }

  signInWithPopup () {
    return this.mockSignInWithPopup()
  }

  signOut() {
    return this.mockSignOut()
  }

  set mockOnAuthStateChangedReturn (val: Object) {
    this._mockOnAuthStateChangedReturn = val
  }

  set mockSignInWithPopupReturn (val: Object) {
    this._mockSignInWithPopupReturn = val
  }

  reset () {
    this._mockOnAuthStateChangedReturn = null
    this._mockSignInWithPopupReturn = null
    this.mockOnAuthStateChanged.mockClear()
    this.mockSignInWithPopup.mockClear()
    this.mockSignOut.mockClear()
  }
}