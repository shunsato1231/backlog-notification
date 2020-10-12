import React from 'react'
// import styles from './Icon.style.styl'

const styles = require('./Icon.style.styl')

interface IconProps extends React.Props<{}> {
  size?: number | 'small' | 'middle' | 'large'
  className?: string,
  theme: 'help' | 'search' | 'loading'
}

export const Icon: React.FC<IconProps> = ({
  size = 'middle',
  className,
  theme
}): JSX.Element => {
  const iconSize 
    = size === 'small'  ? '20px'
    : size === 'middle' ? '25px'
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

interface ImgIconProps extends React.Props<{}> {
  src: string
  alt?: string
  size?: number | 'small' | 'middle' | 'large'
  className?: string
}

export const ImgIcon: React.FC<ImgIconProps> = ({
  src,
  alt,
  size = 'middle',
  className
}): JSX.Element => {
  const iconSize 
    = size === 'small'  ? '25px'
    : size === 'middle' ? '35px'
    : size === 'large'  ? '60px'
    : size + 'px'

    return (
      <img
        className={`${className || ''} ${styles.img}`}
        src = {src}
        alt = {alt}
        width = {iconSize}
        height = {iconSize}
      />
    )
}