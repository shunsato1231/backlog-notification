import React from 'react'
import ReactDOM from 'react-dom'
// import { shallow } from 'enzyme'
import { SetUserList } from './SetUserList.component'

// const sel = (id: string) => {
//   return `[data-testid="${id}"]`
// }

describe('[ORGANISMS] SetUserList', ()=> {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SetUserList />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})
