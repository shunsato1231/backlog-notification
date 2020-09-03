import React from 'react'
import { ImgIcon } from '../../atoms/Icon/Icon.component'
import styles from './UserListItem.style.styl'

interface UserListItemProps extends React.Props<{}> {
  className?: string,
  name: string,
  image: string
}

export const UserListItem: React.FC<UserListItemProps> = ({
  className,
  name,
  image
}): JSX.Element => (
  <li className={`${className || ''} ${styles.userListItem}`}>
    <ImgIcon
      size = 'small'
      src = {image}
      className={styles.image}
    />
    <span
      className={styles.name}
    >{name}</span>
  </li>
)