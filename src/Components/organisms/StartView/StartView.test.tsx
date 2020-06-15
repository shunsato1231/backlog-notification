import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { StartView } from './StartView.component';
import * as ProgressContext  from '../../../Hooks/Progress/Progress.context'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] StartView', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StartView />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  it('should call next when button click', ()=> {
    const nextMock = jest.fn();

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        Next: nextMock,
      }
    })

    const wrapper = shallow(<StartView />)

    wrapper.find(sel('button')).simulate('click')
    expect(nextMock).toBeCalled()
  })

  it('should wrapper class notStarted when currentStep = "allPending"', () => {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 'allPending',
      }
    })

    const wrapper = shallow(<StartView />)

    expect(wrapper.find(sel('wrapper')).hasClass('wrapper')).toBe(true)
    expect(wrapper.find(sel('wrapper')).hasClass('started')).toBe(false)
  })

  it('should wrapper add class started when currentStep>1', () => {
    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        currentStep: 0,
      }
    })

    const wrapper = shallow(<StartView />)

    expect(wrapper.find(sel('wrapper')).hasClass('wrapper')).toBe(true)
    expect(wrapper.find(sel('wrapper')).hasClass('started')).toBe(true)
  })
})
