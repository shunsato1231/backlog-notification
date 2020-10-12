import React from 'react'
import { Icon, ImgIcon } from '../../atoms/Icon/Icon.component'
import styles from './UserListItem.style.styl'

interface UserListItemProps extends React.Props<{}> {
  className?: string,
  name: string,
  image: string,
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void
}

export const UserListItem: React.FC<UserListItemProps> = ({
  className,
  name,
  image,
  onClick
}): JSX.Element => (
  <li
    className={`${className || ''} ${styles.userListItem}`}
    onClick={onClick}
  >
    { image
      ? <ImgIcon
          size = 'small'
          src = {image}
          className={styles.icon}
        />
      : <Icon
          size='small'
          theme='loading'
          className={styles.icon}
        />
    }
    <span
      className={styles.name}
    >{name}</span>
  </li>
)