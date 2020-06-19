import React from 'react'
import styles from './Heading.style.styl'

interface H2Props extends React.Props<{}> {
  type?: 'initialSetting-h2'
  className?: string
}

export const H2: React.FC<H2Props> = ({
  type,
  className,
  children
}): JSX.Element => (
  <h2
    className={`${styles[type]} ${className || ''}`}
  >
    {children}
  </h2>
)