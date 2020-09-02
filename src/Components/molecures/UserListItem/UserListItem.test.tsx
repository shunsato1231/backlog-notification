import React from 'react'
import ReactDOM from 'react-dom'
import { UserListItem } from './UserListItem.component'

describe('[MOLECURES] UserListItem', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<UserListItem
      name='test'
      image=''
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})