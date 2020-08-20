import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { useBacklogApi } from './BacklogApi.hook'
import { errorMessages } from './BacklogApiTypes'

jest.mock('axios')
const axiosGetMock = jest.spyOn(axios, 'get')

describe('[CUSTOM HOOK] useBacklogApi', () => {
  let mockGetSpaceFlag: boolean
  let mockGetSpaceName: string
  let mockGetSpaceErrorCode: number | 'other'

  beforeEach(() => {
    type axiosGetMethods = 'getSpace' | 'error'

    // mock axios get
    axiosGetMock.mockImplementation((url: string):any => {
      const method: axiosGetMethods
        = url.includes('space') ? 'getSpace'
        : 'error'

      switch(method) {
        case 'getSpace':
          return mockGetSpaceFlag
            ? Promise.resolve({data: { 'name': mockGetSpaceName }})
            : Promise.reject({response: {status: mockGetSpaceErrorCode}})
      }
    })
  })

  afterEach(() => {
    axiosGetMock.mockReset()
  })

  it('getSpace return space info when correct apikey and spaceId', async () => {
    mockGetSpaceFlag = true
    mockGetSpaceName = 'test space'
    const {result} = renderHook(() => useBacklogApi('spaceId', 'apiKey'))
    result.current.getSpace()
      .then(res => {
        expect(res.data.name).toEqual(mockGetSpaceName)
      })
  })

  it('getSpace return error when incorrect apiKey and spaceId', async () => {
    mockGetSpaceFlag = false

    const {result} = renderHook(() => useBacklogApi('spaceId', 'apiKey'))
    // 404
    mockGetSpaceErrorCode = 404
    await result.current.getSpace()
      .catch(err => {
        expect(err).toEqual(errorMessages.getSpace[404])
      })

    // 401
    mockGetSpaceErrorCode = 401
    await result.current.getSpace()
      .catch(err => {
        expect(err).toEqual(errorMessages.getSpace[401])
      })

    // other
    mockGetSpaceErrorCode = 'other'
    await result.current.getSpace()
      .catch(err => {
        expect(err).toEqual(errorMessages.getSpace.default)
      })
  })
})