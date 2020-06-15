import React from 'react'

const styles = require('./PageTemplate.style.styl')

export const PageTemplate: React.FC = ({children}) => {
  return (
    <div className={styles.wrapper}>
      { children }
      <footer>
        <small>© 2020 Shun Sato</small>
      </footer>
    </div>
  )
}