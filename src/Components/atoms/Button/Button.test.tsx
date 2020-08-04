import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from './Button.component'


describe('[ATOMS] Button', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders without crashing with props', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button
      theme='add'
      className='testClass'
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders without crashing with break className', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button
      theme='add'
      className=''
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})