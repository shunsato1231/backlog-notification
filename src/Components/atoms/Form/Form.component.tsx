import React from 'react'
import styles from './Form.style.styl'

interface InputProps extends React.Props<{}> {
    className?: string,
    theme?: 'initialSetting',
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input:React.FC<InputProps> = ({
    className,
    theme,
    placeholder,
    onChange
}): JSX.Element => (
    <input
      className={`${styles[theme]} ${className || ''}`}
      onChange={onChange}
      placeholder={placeholder}
    />
)