import React from 'react'
// import styles from './Icon.style.styl'

const styles = require('./Icon.style.styl')

interface IconProps extends React.Props<{}> {
  size?: number | 'small' | 'middle' | 'large'
  className?: string,
  theme: 'help'
}

export const Icon: React.FC<IconProps> = ({
  size,
  className,
  theme
}): JSX.Element => {
  const iconSize 
    = size === 'small'  ? '15px'
    : size === 'middle' ? '20px'
    : size === 'large'  ? '30px'
    : size + 'px'

  const styleVar = {
    '--size': iconSize
  }

  return (
    <i
      className = {`${styles[theme]} ${className || ''}`}
      style={styleVar as React.CSSProperties}
    ></i>
  )
}