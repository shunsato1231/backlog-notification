import React from 'react'
import ReactDOM from 'react-dom'
import { H2, H3 } from './Heading.component'


describe('[ATOMS] Form', () => {

  it('H2 renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<H2/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('H2 renders without crashing with className', () => {
    const div = document.createElement('div')
    ReactDOM.render(<H2
      className='testClass'
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('H3 renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<H3/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('H3 renders without crashing with className', () => {
    const div = document.createElement('div')
    ReactDOM.render(<H3
      className='testClass'
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})