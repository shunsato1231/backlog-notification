import React from 'react'
import ReactDOM from 'react-dom'
import { StartView } from './StartView.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StartView />, div);
  ReactDOM.unmountComponentAtNode(div);
})