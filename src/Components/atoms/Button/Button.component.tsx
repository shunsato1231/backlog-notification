import React from 'react'
import styles from './Button.style.styl'

interface ButtonProps extends React.Props<{}> {
  size?: 'small' | 'medium' | 'large'
  color?: 'green' | 'red'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean,
  className?: string,
  theme?: 'add' | 'delete' | 'back'
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  color = 'green',
  onClick,
  disabled,
  className,
  children,
  theme
}): JSX.Element => (
  <button
    disabled={disabled}
    className = {theme ? `${styles[theme]} ${className || ''}` : `${styles.base} ${styles[color]} ${styles[size]} ${className || ''}`}
    onClick={onClick}
  >
    {children}
  </button>
)