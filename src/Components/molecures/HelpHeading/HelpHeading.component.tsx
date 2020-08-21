import React from 'react'
import { H3 } from '../../atoms/Heading/Heading.component'
import { Icon } from '../../atoms/Icon/Icon.component'
const styles = require('./HelpHeading.style.styl')

interface H3HelpProps extends React.Props<{}> {
  helpLink: string
  className?: string
  theme?: 'initialSettings',
  iconSize?: 'small' | 'middle' | 'large' | number
}

export const H3_Help: React.FC<H3HelpProps> = ({
  helpLink,
  className,
  theme,
  iconSize='middle',
  children
}): JSX.Element => (
  <H3
    theme={theme}
    className={className}
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