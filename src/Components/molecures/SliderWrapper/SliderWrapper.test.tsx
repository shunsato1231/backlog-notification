import React from 'react'
import ReactDOM from 'react-dom'
import { SliderWrapper } from './SliderWrapper.component'
import { shallow } from 'enzyme'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ORGANISMS] SliderWrapper', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SliderWrapper step={0} length={0} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should get css variables', ()=> {
    const wrapper = shallow(<SliderWrapper step={3} length={3} />)
    expect(wrapper.find(sel('wrapper')).get(0).props.style).toHaveProperty('--step', 2)
    expect(wrapper.find(sel('wrapper')).get(0).props.style).toHaveProperty('--length', 3)

    const wrapper2 = shallow(<SliderWrapper step={0} length={3} />)
    expect(wrapper2.find(sel('wrapper')).get(0).props.style).toHaveProperty('--step', 0)
    expect(wrapper2.find(sel('wrapper')).get(0).props.style).toHaveProperty('--length', 3)
  })
})