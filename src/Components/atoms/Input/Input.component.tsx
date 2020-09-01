import React from 'react'
import styles from './Input.style.styl'

interface InputProps extends React.Props<{}> {
    className?: string,
    theme?: 'initialSetting',
    status?: 'normal' | 'error' | 'correct',
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string, 
}

export const Input:React.FC<InputProps> = ({
    className,
    theme,
    status,
    placeholder,
    onChange,
    value,
}): JSX.Element => {
  return (
      <input
        className={`${styles[theme]} ${styles[status]} ${className || ''}`}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
  )
}