import React from 'react'
import styles from './PageTemplate.style.styl'

export const PageTemplate: React.FC = ({children}): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      { children }
      <footer>
        <small>© 2020 Shun Sato</small>
      </footer>
    </div>
  )
}