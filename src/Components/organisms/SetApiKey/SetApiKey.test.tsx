import * as React from 'react'
import ReactDOM from 'react-dom'
import { SetApiKey } from './SetApiKey.component'
import * as SettingsFormContext from '../../../Hooks/SettingsForm/SettingsForm.context'
import { mount, shallow } from 'enzyme'
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'
import * as BacklogApi from '../../../Hooks/BacklogApi/BacklogApi.hook'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] SetApiKey', ()=> {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SetApiKey/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should chnaged settings form status when change spaceId input', () => {
    const dispatchMock = jest.fn();

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: 'test Id'
          },
          errors: {
            spaceId: ''
          }
        },
        dispatch: dispatchMock,
      }
    })

    const wrapper = mount(<SetApiKey />)
    const input = wrapper.find(sel('inputSpaceId')).find('input')
    input.simulate('change')
    expect(dispatchMock).toBeCalledWith({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: 'test Id'
      }
    })
  })

  it('should chnaged settings form status when change apiKey input', () => {
    const dispatchMock = jest.fn();

    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: 'test Key'
          },
          errors: {
            apiKey: ''
          }
        },
        dispatch: dispatchMock,
      }
    })

    const wrapper = mount(<SetApiKey />)
    const input = wrapper.find(sel('inputApiKey')).find('input')
    input.simulate('change')
    expect(dispatchMock).toBeCalledWith({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: 'test Key'
      }
    })
  })

  it('should settings button disabled when apiKey empty', () => {
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: ''
          },
          errors: {
            apiKey: ''
          }
        }
      }
    })

    const wrapper = shallow(<SetApiKey />)
    expect(wrapper.find(sel('settingsButton')).get(0).props.disabled).toBe(true)
    
  })

  it('should settings button disabled when spaceId empty', () => {
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: ''
          },
          errors: {
            spaceId: ''
          }
        }
      }
    })

    const wrapper = shallow(<SetApiKey />)
    expect(wrapper.find(sel('settingsButton')).get(0).props.disabled).toBe(true)
  })

  it('should show error message and settings button disabled when set apikey errors and spaceId errors', () => {
    const apiKeyError = 'apiKey error!!'
    const spaceIdError = 'spaceId error!!'
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            apiKey: '',
            spaceId: '',
            spaceName: ''
          },
          errors: {
            apiKey: apiKeyError,
            spaceId: spaceIdError,
            spaceName: ''
          }
        }
      }
    })

    const wrapper = shallow(<SetApiKey />)

    expect(wrapper.find(sel('inputApiKey')).get(0).props.errorMessage).toBe(apiKeyError)
    expect(wrapper.find(sel('inputSpaceId')).get(0).props.errorMessage).toBe(spaceIdError)
    expect(wrapper.find(sel('settingsButton')).get(0).props.disabled).toBe(true)
  })

  it('should called dispatch when getSpace Api return correct', (done) => {
    const dispatchMock = jest.fn();
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: 'test-1',
            apiKey: 'test Key',
            spaceName: ''
          },
          errors: {
            spaceId: '',
            apiKey: '',
            spaceName: ''
          }
        },
        dispatch: dispatchMock
      }
    })
    const spaceName = 'testSpace'
    const mockGetSpace = jest.fn(() => Promise.resolve({data: {name: spaceName}}))
    jest.spyOn(BacklogApi, 'useBacklogApi').mockImplementation(():any => {
      return {
        getSpace: mockGetSpace
      }
    })

    const wrapper = shallow(<SetApiKey />)
    wrapper.find(sel('settingsButton')).simulate('click')
    
    setImmediate(() => {
      expect(mockGetSpace).toBeCalled()
      expect(dispatchMock).toBeCalledWith({
        type: 'CHANGE_SPACE_NAME',
        payload: {
          name: spaceName,
          error: null
        }
      })
      done()
    })
  })

  it('should show spaceName and go next step when got space name', () => {
    const spaceName = 'space Name!'
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: 'test-1',
            apiKey: 'test Key',
            spaceName: spaceName
          },
          errors: {
            spaceId: '',
            apiKey: '',
            spaceName: ''
          }
        },
      }
    })

    const mockNext = jest.fn()
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: mockNext
      }
    })

    const wrapper = shallow(<SetApiKey />)

    expect(wrapper.find(sel('spaceName')).text()).toBe(spaceName)

    wrapper.find(sel('nextButton')).simulate('click')
      expect(mockNext).toBeCalled()
  })

  it('should called dispatch when getSpace Api return error', (done) => {
    const dispatchMock = jest.fn();
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: 'test-1',
            apiKey: 'test Key',
            spaceName: ''
          },
          errors: {
            spaceId: '',
            apiKey: '',
            spaceName: ''
          }
        },
        dispatch: dispatchMock
      }
    })
    const errorMessage = 'error!!!'
    const mockGetSpace = jest.fn(() => Promise.reject(errorMessage))
    jest.spyOn(BacklogApi, 'useBacklogApi').mockImplementation(():any => {
      return {
        getSpace: mockGetSpace
      }
    })

    const wrapper = shallow(<SetApiKey />)
    wrapper.find(sel('settingsButton')).simulate('click')

    setImmediate(() => {
      expect(mockGetSpace).toBeCalled()
      expect(dispatchMock).toBeCalledWith({
        type: 'CHANGE_SPACE_NAME',
        payload: {
          name: null,
          error: errorMessage
        }
      })
      done()
    })
  })

  it('should show Error message when error space name', () => {
    const spaceNameError = 'space Name Error!'
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: 'test-1',
            apiKey: 'test Key',
            spaceName: ''
          },
          errors: {
            spaceId: '',
            apiKey: '',
            spaceName: spaceNameError
          }
        },
      }
    })

    const mockNext = jest.fn()
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: mockNext
      }
    })

    const wrapper = shallow(<SetApiKey />)

    expect(wrapper.find(sel('spaceNameError')).text()).toBe(spaceNameError)

    expect(wrapper.find(sel('settingsButton')).get(0).props.disabled).toBe(true)
    expect(wrapper.find(sel('inputSpaceId')).get(0).props.errorFlag).toBe(true)
    expect(wrapper.find(sel('inputApiKey')).get(0).props.errorFlag).toBe(true)
  })
})