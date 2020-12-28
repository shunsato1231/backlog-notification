import React from 'react'
import { Icon } from '../Icon/Icon.component'
import styles from './Input.style.styl'

export interface InputProps extends React.Props<{}> {
    className?: string,
    theme?: 'default' | 'search',
    status?: 'normal' | 'error' | 'correct',
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    height?: number
}

export const Input:React.FC<InputProps> = ({
    className,
    theme = 'default',
    status,
    placeholder,
    onChange,
    value,
    height
}): JSX.Element => {
  return (
    <div
      style={{height: height + 'px'}}
      className={`${className || ''} ${styles.wrapper}`}
    >
      <input
        className={`${styles[theme]} ${styles[status]}`}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {theme === 'search' &&
        <Icon
          theme='search'
          className={styles.searchIcon}
          size='middle'
        />
      }
    </div>
  )
}