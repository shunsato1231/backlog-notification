import React from 'react'
import ReactDOM from 'react-dom'
import * as ProgressContext from '../../../Hooks/Progress/Progress.context'
import { ProgressBar } from './ProgressBar.component';
import { shallow } from 'enzyme';

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] ProgressBar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProgressBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render status as many as progress List', ()=> {
    const progressList = [
      {
        name: 'step1',
        status: 'done'
      },
      {
        name: 'step2',
        status: 'current'
      },
      {
        name: 'step3',
        status: 'pending'
      }
    ]

    jest.spyOn(ProgressContext, 'useProgressContext').mockImplementation(():any => {
      return {
        progressList: progressList
      }
    })

    const wrapper = shallow(<ProgressBar/>)

    // step number
    expect(wrapper.find(sel('step')).length).toBe(progressList.length)

    //step1
    expect(wrapper.find(sel('step')).at(0).hasClass('done')).toBe(true)
    expect(wrapper.find(sel('description')).at(0).text()).toBe('step1')
    //step2
    expect(wrapper.find(sel('step')).at(1).hasClass('current')).toBe(true)
    expect(wrapper.find(sel('description')).at(1).text()).toBe('step2')
    //step3
    expect(wrapper.find(sel('step')).at(2).hasClass('pending')).toBe(true)
    expect(wrapper.find(sel('description')).at(2).text()).toBe('step3')
  })
})
