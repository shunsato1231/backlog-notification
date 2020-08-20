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

  it('should settings button disabled when  apiKey', () => {
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

  it('should settings button disabled when  spaceId', () => {
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

  it('should display space name when getSpace return correct', (done) => {
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: 'test-1',
            apiKey: 'test Key'
          },
          errors: {
            spaceId: '',
            apiKey: ''
          }
        }
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
      const spaceNameElement = wrapper.find(sel('space-name'))
      expect(spaceNameElement.text()).toBe(spaceName)
      done()
    })
  })

  it('should display  message when getSpace return ', (done) => {
    jest.spyOn(SettingsFormContext, 'useSettingsFormContext').mockImplementation(():any => {
      return {
        state: {
          inputs: {
            spaceId: 'test-1',
            apiKey: 'test Key'
          },
          errors: {
            spaceId: '',
            apiKey: ''
          }
        }
      }
    })
    const errorMessage = '!!!'
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
      const errorElement = wrapper.find(sel('isError'))
      expect(errorElement.text()).toBe(errorMessage)
      done()
    })
  })

  it('should go next step when got space name', (done) => {
    const mockGetSpace = jest.fn(() => Promise.resolve({data: {name: 'spaceName'}}))
    jest.spyOn(BacklogApi, 'useBacklogApi').mockImplementation(():any => {
      return {
        getSpace: mockGetSpace
      }
    })

    const mockNext = jest.fn()
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: mockNext
      }
    })

    jest.spyOn(React, 'useState').mockReturnValue(['testVal', jest.fn()])

    const wrapper = shallow(<SetApiKey />)
    wrapper.find(sel('settingsButton')).simulate('click')

    setImmediate(() => {
      wrapper.find(sel('nextButton')).simulate('click')
      expect(mockNext).toBeCalled()
      done()
    })
  })
})