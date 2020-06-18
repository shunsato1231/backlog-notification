import React from 'react'
import ReactDOM from 'react-dom'
import { SliderWrapper } from './SliderWrapper.component'

describe('[ORGANISMS] SliderWrapper', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SliderWrapper step={0} length={0} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})