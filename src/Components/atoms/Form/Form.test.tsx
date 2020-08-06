import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from './Form.component'
import { shallow, mount } from 'enzyme'

import styles from './Form.style.styl'

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

describe('[ATOMS] Form', () => {

  it('Input renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Input
      value='test value'
      />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('Input renders without crashing with className', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Input
      value='test value'
      className='testClass'
    />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('should hidden error message and not set style when initial loading and errorMessage is string', () => {
    let errorMessage: string = 'error!'
    const wrapper = shallow(<Input
      value=''
      errorMessage={errorMessage}
    />)

    const input = wrapper.find(sel('input'))
    const text = wrapper.find(sel('errorMessage'))

    expect(input.hasClass(styles.validateError)).toBe(false)
    expect(input.hasClass(styles.validateOk)).toBe(false)
    expect(text.text()).toEqual('')
  })

  it('should set error style when errorMessage is string and changed message', () => {
    let errorMessage: string = 'error!'
    const wrapper = mount(<Input
      theme='initialSetting'
      value=''
      errorMessage={errorMessage}
    />)

    //change text
    wrapper.setProps({value: 'test'})
    wrapper.update()

    const input = wrapper.find(sel('input'))
    const text = wrapper.find(sel('errorMessage'))

    expect(input.hasClass(styles.validateError)).toBe(true)
    expect(input.hasClass(styles.validateOk)).toBe(false)
    expect(text.text()).toEqual(errorMessage)
  })

  it('should hidden error message and not set style when initial loading and errorMessage is null', () => {
    let errorMessage: string = null
    const wrapper = shallow(<Input
      value=''
      errorMessage={errorMessage}
    />)

    const input = wrapper.find(sel('input'))
    const text = wrapper.find(sel('errorMessage'))

    expect(input.hasClass(styles.validateError)).toBe(false)
    expect(input.hasClass(styles.validateOk)).toBe(false)
    expect(text.text()).toEqual('')
  })

  it('should set error style when errorMessage is null and changed message', () => {
    let errorMessage: string = null
    const wrapper = mount(<Input
      value=''
      errorMessage={errorMessage}
    />)

    //change text
    wrapper.setProps({value: 'test'})
    wrapper.update()

    const input = wrapper.find(sel('input'))
    const text = wrapper.find(sel('errorMessage'))

    expect(input.hasClass(styles.validateError)).toBe(false)
    expect(input.hasClass(styles.validateOk)).toBe(true)
    expect(text.text()).toEqual('')
  })


  it('should hide errorStyle and error message when errorMessage props is undefined', () => {
    const wrapper = mount(<Input
      value=''
    />)

    const input = wrapper.find(sel('input'))
    const text = wrapper.find(sel('errorMessage'))

    expect(text.length).toBe(0)

    //change text
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: true })
    input.props().value = 'test'
    input.simulate('change')

    expect(input.hasClass(styles.validateError)).toBe(false)
    expect(input.hasClass(styles.validateOk)).toBe(false)
    expect(text.length).toBe(0)
  })
})