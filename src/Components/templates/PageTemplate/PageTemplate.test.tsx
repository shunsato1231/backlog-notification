import React from 'react'
import ReactDOM from 'react-dom'
import { PageTemplate } from './PageTemplate.component'

describe('[TEMPLATE] PageTemplate', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<PageTemplate />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})