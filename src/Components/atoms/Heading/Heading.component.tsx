import React from 'react'
import styles from './Heading.style.styl'

interface H2Props extends React.Props<{}> {
  theme?: 'initialSetting-h2'
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