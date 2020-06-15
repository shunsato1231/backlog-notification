import React from 'react'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'

// tslint:disable-next-line:no-any
const styles: any = require('./StartView.style.styl')

export const StartView:React.FC = () => {
  const progress = useProgressContext()

  return (
    <section
      className={ progress.currentStep === 'allPending' ? styles.wrapper : `${styles.wrapper} ${styles.started}` }
      data-testid='wrapper'
      >
      <h1 className={styles.title}>Backlog Notification</h1>
      <p className={styles.description}>バックログのお知らせをpush通知します</p>
      <button
        className={styles.button}
        onClick={()=>{progress.Next()}}
        data-testid='button'
      >設定して利用開始する</button>
    </section>
  )
}