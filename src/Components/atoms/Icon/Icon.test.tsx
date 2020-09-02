import React from 'react'
import ReactDOM from 'react-dom'
import { Icon, ImgIcon } from './Icon.component'

describe('[ATOMS] Icon', () => {

  it('Icon renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Icon theme='help'/>, div)
    ReactDOM.render(<ImgIcon src=''/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('Icon renders without crashing with className', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Icon
      theme='help'
      className='testClass'
    />, div)
    ReactDOM.render(<ImgIcon
      src=''
      className='testClass'
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('Icon renders without crashing with size', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Icon
      theme='help'
      size='small'
    />, div)

    ReactDOM.render(<ImgIcon
      src=''
      size='small'
    />, div)

    ReactDOM.render(<Icon
      theme='help'
      size='middle'
    />, div)

    ReactDOM.render(<ImgIcon
      src=''
      size='middle'
    />, div)

    ReactDOM.render(<Icon
      theme='help'
      size='large'
    />, div)

    ReactDOM.render(<ImgIcon
      src=''
      size='large'
    />, div)

    ReactDOM.render(<Icon
      theme='help'
      size={40}
    />, div)

    ReactDOM.render(<ImgIcon
      src=''
      size={40}
    />, div)

    ReactDOM.unmountComponentAtNode(div)
  })
})