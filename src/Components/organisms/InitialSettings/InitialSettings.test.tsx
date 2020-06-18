import React from 'react'
import ReactDOM from 'react-dom'
import { InitialSettings } from './InitialSettings.component'
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'
import { shallow } from 'enzyme'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] InitialSettings', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<InitialSettings />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has class "notStarted" when currentStep is "allPending" ', ()=> {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 'allPending',
      }
    })

    const wrapper = shallow(<InitialSettings />)
    expect(wrapper.find(sel('wrapper')).hasClass('notStarted')).toBe(true)
    expect(wrapper.find(sel('wrapper')).hasClass('wrapper')).toBe(true)
  })

  it('has not class "notStarted" when currentStep is 1 ', ()=> {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 1,
      }
    })

    const wrapper = shallow(<InitialSettings />)
    expect(wrapper.find(sel('wrapper')).hasClass('notStarted')).toBe(false)
    expect(wrapper.find(sel('wrapper')).hasClass('wrapper')).toBe(true)
  })

  it('has not class "notStarted" when currentStep is "finish"', ()=> {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 'finish',
      }
    })

    const wrapper = shallow(<InitialSettings />)
    expect(wrapper.find(sel('wrapper')).hasClass('notStarted')).toBe(false)
    expect(wrapper.find(sel('wrapper')).hasClass('wrapper')).toBe(true)
  })
})