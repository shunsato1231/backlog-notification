import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import { useBacklogApi } from './BacklogApi.hook'
import { Space, Project, User, errorMessages } from './BacklogApiTypes'

jest.mock('axios')
const axiosGetMock = jest.spyOn(axios, 'get')

describe('[CUSTOM HOOK] useBacklogApi', () => {
  let mockGetSpaceFlag: boolean
  let mockGetSpaceErrorCode: number | 'other'
  let mockSpace: Space   = {
    "spaceKey": 'testSpace', 
    "name": 'testSpace', 
    "ownerId": 123, 
    "lang": 'en', 
    "timezone": 'testTime', 
    "reportSendTime": 'testTime', 
    "textFormattingRule": 'testRule', 
    "created": 'testDate', 
    "updated": 'testDate'
  }

  let mockGetProjectsFlag: boolean
  let projectKey1: string = 'test1'
  let projectKey2: string = 'test2'
  let mockProjects: Project[] = [
    {
      "id": 1, 
      "projectKey": projectKey1, 
      "name": "test", 
      "chartEnabled": false, 
      "subtaskingEnabled": false, 
      "projectLeaderCanEditProjectLeader": false, 
      "textFormattingRule": "markdown", 
      "archived":false 
    },
    {
      "id": 2, 
      "projectKey": projectKey2, 
      "name": "test", 
      "chartEnabled": false, 
      "subtaskingEnabled": false, 
      "projectLeaderCanEditProjectLeader": false, 
      "textFormattingRule": "markdown", 
      "archived":false 
    }
  ]

  let mockGetUsersFlag: boolean
  let mockUser1: User = {
      "id": 1, 
      "userId": 'testUserId1', 
      "name": 'test1', 
      "roleType": 1, 
      "lang": 'en', 
      "mailAddress": 'test@test.com',
      "nulabAccount": null
    }
  let mockUser2: User = {
    "id": 2, 
    "userId": 'testUserId2', 
    "name": 'test2', 
    "roleType": 2,
    "lang": 'en', 
    "mailAddress": 'test@test.com',
    "nulabAccount": null
  }
  let mockUser3: User = {
    "id": 3, 
    "userId": 'testUserId3', 
    "name": 'test3', 
    "roleType": 3,
    "lang": 'en', 
    "mailAddress": 'test@test.com',
    "nulabAccount": null
  }

  let mockGetUserIconFlag: boolean
  let mockIconType: string = 'jpeg'
  let mockIconData: string = 'test'
  

  beforeEach(() => {
    type axiosGetMethods = 'getSpace' | 'getProjects' | 'getUsers' | 'getUserIcon' | 'error'
    
    const cerateMethodName = (url: string): axiosGetMethods => {
      const methodName: axiosGetMethods
        = url.includes('space') ? 'getSpace'
        : url.includes('projects') && !url.includes('users') ? 'getProjects'
        : url.includes('projects') && url.includes('users') ? 'getUsers'
        : url.includes('icon') ? 'getUserIcon'
        : 'error'

      return methodName
    }

    // mock axios get
    axiosGetMock
      .mockImplementation((url: string): any => {
        const method: axiosGetMethods = cerateMethodName(url) 
        switch(method) {
          case 'getSpace':
            return mockGetSpaceFlag
              ? Promise.resolve({data: mockSpace})
              : Promise.reject({response: {status: mockGetSpaceErrorCode}})
          case 'getProjects':
            return mockGetProjectsFlag
              ? Promise.resolve({data: mockProjects})
              : Promise.reject()
          case 'getUsers':
            return mockGetUsersFlag
              ? 
                url.includes(projectKey1)
                  ? Promise.resolve({data: [mockUser1, mockUser2]})
                : url.includes(projectKey2)
                  ? Promise.resolve({data: [mockUser2, mockUser3]})
                : Promise.resolve({data: [mockUser1, mockUser2]})
              : Promise.reject()
          case 'getUserIcon':
            return mockGetUserIconFlag
              ? Promise.resolve({
                headers: {
                  'content-type': mockIconType
                },
                data: mockIconData
              })
              : Promise.reject()
        }
      })
  })

  afterEach(() => {
    axiosGetMock.mockReset()
  })

  it('getSpace return space info when correct apikey and spaceId', () => {
    mockGetSpaceFlag = true
    const {result} = renderHook(() => useBacklogApi('id', 'apiKey'))
    result.current.getSpace()
      .then(res => {
        expect(res).toEqual(mockSpace)
      })
  })

  it('getSpace return error when incorrect apiKey and spaceId', () => {
    mockGetSpaceFlag = false

    const {result} = renderHook(() => useBacklogApi('id', 'apiKey'))
    // 404
    mockGetSpaceErrorCode = 404
    result.current.getSpace()
      .catch(err => {
        expect(err).toEqual(errorMessages.getSpace[404])
      })

    // 401
    mockGetSpaceErrorCode = 401
    result.current.getSpace()
      .catch(err => {
        expect(err).toEqual(errorMessages.getSpace[401])
      })

    // other
    mockGetSpaceErrorCode = 'other'
    result.current.getSpace()
      .catch(err => {
        expect(err).toEqual(errorMessages.getSpace.default)
      })
  })

  it('getUsers return users when api success', () => {
    mockGetProjectsFlag = true
    mockGetUsersFlag = true

    const {result} = renderHook(() => useBacklogApi('id', 'apiKey'))
    result.current.getUsers()
      .then(res => {
        expect(res).toEqual([mockUser1, mockUser2, mockUser3])
      })
  })

  it('getUsers return users when api error', () => {

    const {result} = renderHook(() => useBacklogApi('id', 'apiKey'))

    mockGetProjectsFlag = false
    mockGetUsersFlag = true
    result.current.getUsers()
      .catch(err => {
        expect(err).toEqual(errorMessages.getUsers)
      })

    mockGetProjectsFlag = true
    mockGetUsersFlag = false
    result.current.getUsers()
      .catch(err => {
        expect(err).toEqual(errorMessages.getUsers)
      })

    mockGetProjectsFlag = false
    mockGetUsersFlag = false
    result.current.getUsers()
      .catch(err => {
        expect(err).toEqual(errorMessages.getUsers)
      })
  })

  it('getUserIcon return users when api success', () => {
    mockGetUserIconFlag = true

    const {result} = renderHook(() => useBacklogApi('id', 'apiKey'))
    result.current.getUserIcon(123)
      .then(res => {
        const base64 = new Buffer(mockIconData, "binary").toString("base64")
        const prefix = `data:${mockIconType};base64,`

        expect(res).toEqual(prefix + base64)
      })
  })

  it('getUserIcon return users when api error', () => {
    mockGetUserIconFlag = false

    const {result} = renderHook(() => useBacklogApi('id', 'apiKey'))
    result.current.getUserIcon(123)
      .catch(res => {
        expect(res).toEqual(null)
      })
  })
})