import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react'
import { User } from '../../../Hooks/BacklogApi/backlogApiTypes'
import { UserListItem } from '../../molecures/UserListItem/UserListItem.component'
import { Input } from '../../atoms/Input/Input.component'
import styles from './UserSelect.style.styl'
import useResizeObserver from '../../../Hooks/ResizeObserver/ResizeObserver.hook'
import _ from 'lodash'

export interface ImageUser extends User {
  iconImage: string
}

interface UserSelectProps extends React.Props<{}> {
  className?: string,
  width?: string,
  userList: ImageUser[],
  value: ImageUser,
  onChange: (user: ImageUser) => void,
  onAppear: (user: ImageUser) => Promise<any>
}

export const UserSelect: React.FC<UserSelectProps> = ({
  className,
  width,
  userList,
  value,
  onChange,
  onAppear
}) => {
  const [searchUserList, setSearchUserList] = useState<ImageUser[]>(userList)
  const [searchWord, setSearchWord] = useState<string>('')
  const [scrollSectionIndex, setScrollSectionIndex] = useState<number>(0)
  const [styleVar, setStyleVar] = useState<Object>({
    '--top': 0,
    '--left': 0,
    '--width': 0
  })
  const [isShow, setIsShow] = useState(false)
  const isFirstRender = useRef(true)
  const userListRef = useRef(null)
  const wrapperRef = useRef(null)

  const updateSearchWord = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value)
  }, [])

  const searchUser  = (word: string): ImageUser[] => {
    return userList.reduce((prev, user) => {
      if(~user.name.indexOf(word)) {
        prev.push(user)
      }
      return prev
    }, [])
  }

  const getIconImage = async (userList: ImageUser[], scrollSectionIndex: number) => {
    setSearchUserList(await Promise.all(userList.map(async (item, index) => {
      if(index >= scrollSectionIndex  * 10 && index < (scrollSectionIndex + 1) * 10) {
        return await onAppear(item)
          .then(icon => {
            item.iconImage = icon
            return item
          })
      } else {
        return item
      }
    })))
  }

  const selecterTrigger = () => {
    setIsShow(!isShow)
  }

  const handleClick = (e: MouseEvent) => {
    if(wrapperRef && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsShow(false)
    } 
  }
 
  const scrollFnc = () => {
    setScrollSectionIndex(Math.ceil(userListRef.current.scrollTop / 228))
  }

  const getPoint = () => {
    setStyleVar({
      '--top': wrapperRef.current.getBoundingClientRect().bottom,
      '--left': wrapperRef.current.getBoundingClientRect().left,
      '--width': width ? width : wrapperRef.current.getBoundingClientRect().width + 'px'
    })
  }

  useResizeObserver(wrapperRef, _.debounce((entry) => {
    setStyleVar({
      '--top': entry.bottom,
      '--left': entry.left,
      '--width': width ? width : entry.width + 'px'
    })
  }, 200))

  useLayoutEffect(() => {
    getPoint()
  }, [])

  useEffect(() => {
    userListRef.current.addEventListener('scroll', scrollFnc)
    window.addEventListener('scroll', getPoint)
    window.addEventListener('click', handleClick)
    return () => {
      userListRef.current.removeEventListener('scroll', scrollFnc)
      window.removeEventListener('scroll', getPoint)
      window.removeEventListener('click', handleClick)
    }
  },[])
 
  useEffect(() => {
    const _searchUserList = searchUser(searchWord)
    getIconImage(_searchUserList, 0)
  }, [searchWord])

  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      getIconImage(searchUserList, scrollSectionIndex)
    }
  }, [scrollSectionIndex])

  return (
    <div
      className={`${className || ''}`}
      style={styleVar as React.CSSProperties}
      ref={wrapperRef}
    >
      <div
        onClick={selecterTrigger}
      >
        {value
          ? <UserListItem
              className={`${styles.arrow} ${styles.selected}`}
              name={value.name}
              image={value.iconImage}
            />
          : <p
              className={`${styles.unselect} ${styles.arrow}`}
            >
              ユーザを選択してください
            </p>
        }
      </div>
      <div
        className={`${styles.selecterWrapper} ${isShow ? styles.open : styles.close}`}
      >
        <div className={styles.searchBox}>
          <Input
            className={styles.searchInput}
            value={searchWord}
            theme='search'
            onChange={updateSearchWord}
          />
        </div>
        <ul
          className={styles.userList}
          ref={userListRef}
        >
          {
            searchUserList.length === 0
              ? <p>{`No results match "${searchWord}"`}</p>
              : searchUserList.map(item =>
                <UserListItem
                  className={styles.userListItem}
                  name={item?.name}
                  image={item?.iconImage}
                  key={item?.id}
                  onClick={
                    () => {
                      onChange(item)
                      setIsShow(false)
                    }
                  }
                />
              )
          }
        </ul>
      </div>
    </div>
  )
}