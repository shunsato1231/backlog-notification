import React from 'react'
import ReactDOM from 'react-dom'
import { SliderWrapper } from './SliderWrapper.component'

describe('[TEMPLATE] PageTemplate', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SliderWrapper />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})