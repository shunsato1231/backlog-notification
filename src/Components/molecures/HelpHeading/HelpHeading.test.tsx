import React from 'react'
import ReactDOM from 'react-dom'
import { H3_Help, H2_Help } from './HelpHeading.component'

describe('[MOLECURES] HelpHeading', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<H2_Help
      helpLink='test'
    />, div)
    ReactDOM.render(<H3_Help
      helpLink='test'
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})