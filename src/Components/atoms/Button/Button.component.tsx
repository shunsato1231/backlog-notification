import React from 'react'
import styles from './Button.style.styl'

export interface ButtonProps extends React.Props<{}> {
  size?: 'small' | 'medium' | 'large'
  color?: 'green' | 'red'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean,
  className?: string,
  theme?: 'default' | 'add' | 'delete' | 'back'
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  color = 'green',
  onClick,
  disabled,
  className,
  children,
  theme = 'default'
}): JSX.Element => (
  <button
    disabled={disabled}
    className = {theme === 'default' ? `${styles.base} ${styles[color]} ${styles[size]} ${className || ''}` : `${styles[theme]} ${className || ''}`}
    onClick={onClick}
  >
    {theme === 'default' && children}
  </button>
)