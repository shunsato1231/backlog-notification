import React from 'react'
import { Icon } from '../Icon/Icon.component'
import styles from './Input.style.styl'

interface InputProps extends React.Props<{}> {
    className?: string,
    theme?: 'default' | 'search',
    status?: 'normal' | 'error' | 'correct',
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string, 
}

export const Input:React.FC<InputProps> = ({
    className,
    theme = 'default',
    status,
    placeholder,
    onChange,
    value,
}): JSX.Element => {
  return (
    <div
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