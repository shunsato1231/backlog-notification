import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from './Input.component'

describe('[ATOMS] Form', () => {

  it('Input renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Input
      value='test value'
      />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

})