import React from 'react'
import ReactDOM from 'react-dom'
import { Introduction } from './Introduction.component'

describe('[PAGES] Introduction', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Introduction />, div)
    ReactDOM.unmountComponentAtNode(div)
  })  
})