import { act } from '@testing-library/react-hooks';
import { mount, shallow } from 'enzyme';

import React from 'react'
import ReactDOM from 'react-dom'
import { ImageUser, UserSelect } from "./UserSelect.component";

const sel = (id: string) => {
  return `[data-testid="${id}"]`
}

const mockUserList: ImageUser[] = [
  {
    id: 123,
    userId: 'user1',
    name: 'testUser1',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  }
]

const mockUserList2: ImageUser[] = [
  {
    id: 123,
    userId: 'user1',
    name: 'testUser1',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user1',
    name: 'testUser1',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user1',
    name: 'testUser1',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user1',
    name: 'testUser1',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user1',
    name: 'testUser1',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  },
  {
    id: 123,
    userId: 'user2',
    name: 'testUser2',
    iconImage: 'hogehoge',
    roleType: 0,
    lang: 'jp',
    mailAddress: 'test@mail.com',
    nulabAccount: null
  }
]

describe('[ORGANISMS] UserSelect', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('open user list when click', () => {
    const wrapper = shallow(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    expect(wrapper.find(sel('selecterWrapper')).hasClass('close')).toBe(true)

    wrapper.find(sel('selecterTrigger')).simulate('click')
    expect(wrapper.find(sel('selecterWrapper')).hasClass('open')).toBe(true)

    wrapper.find(sel('selecterTrigger')).simulate('click')
    expect(wrapper.find(sel('selecterWrapper')).hasClass('close')).toBe(true)
  })

  it('close user list when click outside', () => {
    const map: any = {};
    window.addEventListener = jest.fn((event, callback) => {
      map[event] = callback
    })

    const wrapper = mount(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    wrapper.find(sel('selecterTrigger')).simulate('click')
    expect(wrapper.find(sel('selecterWrapper')).hasClass('open')).toBe(true)


    map.click({ target: document.createElement('a') })
    expect(wrapper.update().find(sel('selecterWrapper')).hasClass('close')).toBe(true)
  })

  it('not change user list show when click inside', () => {
    const map: any = {};
    window.addEventListener = jest.fn((event, callback) => {
      map[event] = callback
    })

    const wrapper = mount(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    wrapper.find(sel('selecterTrigger')).simulate('click')
    expect(wrapper.find(sel('selecterWrapper')).hasClass('open')).toBe(true)


    map.click({ target: wrapper.find(sel('input')).getDOMNode() })
    expect(wrapper.update().find(sel('selecterWrapper')).hasClass('open')).toBe(true)
  })

  it('change style var when scroll window', () => {
    const map: any = {};
    window.addEventListener = jest.fn((event, callback) => {
      map[event] = callback
    })

    const wrapper = mount(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    // scroll
    //@ts-ignore
    wrapper.find(sel('wrapper')).getElement().ref.current = {
      getBoundingClientRect() { return {
          width: 120,
          height: 120,
          top: 100,
          left: 100,
          bottom: 100,
          right: 100,
        } as DOMRect
      }
    }

    map.scroll()
    wrapper.update()

    expect(wrapper.find(sel('wrapper')).prop('style')).toEqual({ '--top': 100, '--left': 100, '--width': '120px' })
  })

  it('const style var width when set width', () => {
    const wrapper = mount(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
      width='100%'
    />)

    wrapper.update()
    expect(wrapper.find(sel('wrapper')).prop('style')).toEqual({ '--top': 0, '--left': 0, '--width': '100%' })
  })

  it('set item when set value', () => {
    const wrapper1 = shallow(<UserSelect
      userList={mockUserList}
      value={null}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    expect(wrapper1.find(sel('notSelectedUser')).length).toEqual(1)
    expect(wrapper1.find(sel('selectedUser')).length).toEqual(0)

    const wrapper2 = shallow(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    expect(wrapper2.find(sel('notSelectedUser')).length).toEqual(0)
    expect(wrapper2.find(sel('selectedUser')).length).toEqual(1)
    expect(wrapper2.find(sel('selectedUser')).prop('name')).toEqual(mockUserList[0].name)
  })

  it('change value when click user list item', () => {
    const mockOnChange = jest.fn()
    const wrapper = shallow(<UserSelect
      userList={mockUserList}
      value={null}
      onChange={mockOnChange}
      onAppear={async (item) => {item}}
    />)

    wrapper.find(sel('userListItem')).at(0).simulate('click')
    expect(mockOnChange).toBeCalledWith(mockUserList[0])
  })

  it('should sort user list when search list', (done) => {
    const wrapper = mount(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    expect(wrapper.find(sel('userListItem')).length).toBe(2)

    const input =  wrapper.find(sel('input')).find('input')
    input.simulate('change', {target: {value: 'testUser1'}})

    setImmediate(() => {
      wrapper.update()
      expect(wrapper.find(sel('userListItem')).length).toBe(1)
      expect(wrapper.find(sel('userListItem')).find('span').text()).toEqual('testUser1')
      done()
    })
  })

  it('show "not found" when search result 0', (done) => {
    const wrapper = mount(<UserSelect
      userList={mockUserList}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={async (item) => {item}}
    />)

    expect(wrapper.find(sel('userListItem')).length).toBe(2)

    setImmediate(async () => {
      const input =  wrapper.find(sel('input')).find('input')
      await act(async () => {
        input.simulate('change', {target: {value: 'hogehoge'}})
      })
    
      wrapper.update()
      expect(wrapper.find(sel('userListItem')).length).toBe(0)
      expect(wrapper.find(sel('notFound')).text()).toEqual('No results match "hogehoge"')
      done()
    })
  })

  it('call onAppear initial 10 item when mounted', () => {
    const mockOnAppear = jest.fn(async (item) => item)
    mount(<UserSelect
      userList={mockUserList2}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={mockOnAppear}
    />)

    expect(mockOnAppear.mock.calls.length).toBe(10)
    for(let index = 0; index < 10; index ++) {
      expect(mockOnAppear.mock.calls[index][0]).toEqual(mockUserList2[index])
    }
  })

  it('call onAppear initial 10 later item when scroll', (done) => {
    const mockOnAppear = jest.fn(async (item) => item)
    const wrapper = mount(<UserSelect
      userList={mockUserList2}
      value={mockUserList[0]}
      onChange={(item) => {item}}
      onAppear={mockOnAppear}
    />)

    mockOnAppear.mockClear()
    const userListWrapper = wrapper.find(sel('userList'))

    setImmediate(async () => {
      //@ts-ignore
      userListWrapper.getElement().ref.current.scrollTop = 200
      const scrollEvent = new Event('scroll')
      await act(async () => {
        wrapper.find(sel('userList')).getDOMNode().dispatchEvent(scrollEvent)
      })
      wrapper.update()

      expect(mockOnAppear.mock.calls.length).toBe(3)

      for(let index = 0; index < 3; index ++) {
        expect(mockOnAppear.mock.calls[index][0]).toEqual(mockUserList2[index + 10])
      }
  
      done()
    })
  })
})