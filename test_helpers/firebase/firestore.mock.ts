 /* istanbul ignore file */

interface IFiresoreMock {
  mockCollection: jest.Mock;
  mockDoc: jest.Mock;
  mockSet: jest.Mock;
  _mockSetReturn: Object;
  mockGet: jest.Mock;
  _mockGetReturn: Object;
}

export default class FirestoreMock implements IFiresoreMock {
  mockCollection: jest.Mock;
  mockDoc: jest.Mock;
  mockSet: jest.Mock;
  _mockSetReturn: Object;
  mockGet: jest.Mock;
  _mockGetReturn: Object;


  constructor () {
    // mocked methods that return the class
    this.mockCollection = jest.fn(() => this)
    this.mockDoc = jest.fn(() => this)


    // methods that return promises
    this.mockSet = jest.fn(() => Promise.resolve(this._mockSetReturn))
    this.mockGet = jest.fn(() => Promise.resolve(this._mockGetReturn))

    // return values
    this._mockSetReturn = null
    this._mockGetReturn = null
  }

  collection (c: string) {
    return this.mockCollection(c)
  }

  doc (d: string) {
    return this.mockDoc(d)
  }

  set (a: string) {
    return this.mockSet(a)
  }

  get () {
    return this.mockGet()
  }

  set mockSetReturn (val: Object) {
    this._mockSetReturn = val
  }

  set mockGetReturn (val: Object) {
    this._mockGetReturn = val
  }


  reset () {
    // reset all the mocked returns
    this._mockSetReturn = null
    this._mockGetReturn = null

    // reset all the mocked functions
    this.mockCollection.mockClear()
    this.mockDoc.mockClear()
    this.mockSet.mockClear()
    this.mockGet.mockClear()
  }
}