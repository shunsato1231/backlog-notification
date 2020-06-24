import React from 'react'
import styles from './Heading.style.styl'

interface H2Props extends React.Props<{}> {
  theme?: 'initialSettings'
  className?: string
}

export const H2: React.FC<H2Props> = ({
  theme,
  className,
  children
}): JSX.Element => (
  <h2
    className={`${styles[theme]} ${className || ''}`}
  >
    {children}
  </h2>
)

export const H3: React.FC<H2Props> = ({
  theme,
  className,
  children
}): JSX.Element => (
  <h3
    className={`${styles[theme]} ${className || ''}`}
  >
    {children}
  </h3>
)