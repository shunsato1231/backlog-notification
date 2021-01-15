import React from 'react'
import { H2, H3 } from '../../atoms/Heading/Heading.component'
import { Icon } from '../../atoms/Icon/Icon.component'
import styles from './HelpHeading.style.styl'

export interface HelpHeadingProps extends React.Props<{}> {
  helpLink: string
  className?: string
  theme?: 'initialSettings',
  iconSize?: 'small' | 'middle' | 'large' | number
}

export const H2_Help: React.FC<HelpHeadingProps> = ({
  helpLink,
  className,
  theme,
  iconSize='small',
  children
}): JSX.Element => (
  <H2
    theme={theme}
    className={`${className || ''} ${styles['help']}`}
  >
    {children}
    <a
      target='_blank'
      href={helpLink}
      className={styles[theme + 'Icon']}
    >
      <Icon
        theme='help'
        size={iconSize}
      />
    </a>
  </H2>
)

export const H3_Help: React.FC<HelpHeadingProps> = ({
  helpLink,
  className,
  theme,
  iconSize='small',
  children
}): JSX.Element => (
  <H3
    theme={theme}
    className={`${className || ''} ${styles['help']}`}
  >
    {children}
    <a
      target='_blank'
      href={helpLink}
      className={styles[theme + 'Icon']}
    >
      <Icon
        theme='help'
        size={iconSize}
      />
    </a>
  </H3>
)