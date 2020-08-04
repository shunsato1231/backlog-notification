import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from './Form.component'


describe('[ATOMS] Form', () => {

  it('Input renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Input
      value='test value'
      />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('Input renders without crashing with className', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Input
      value='test value'
      className='testClass'
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})