import React from 'react'
import styles from './Heading.style.styl'

export interface HeadingProps extends React.Props<{}> {
  theme?: 'initialSettings'
  className?: string
}

export const H2: React.FC<HeadingProps> = ({
  theme,
  className,
  children
}): JSX.Element => (
  <h2
    className={`${styles[theme]} ${className || ''}`}
  >
    {children}
    (heading)
  </h2>
)

export const H3: React.FC<HeadingProps> = ({
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