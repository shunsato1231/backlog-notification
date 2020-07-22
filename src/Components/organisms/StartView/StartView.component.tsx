import React from 'react'
import styles from './StartView.style.styl'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
import { useAuthContext } from '../../../Hooks/Auth/Auth.context'

export const StartView:React.FC = (): JSX.Element => {
  const progress = useProgressContext()
  const auth = useAuthContext()

  return (
    <section
      className={ progress.currentStep === 'allPending' ? styles.wrapper : `${styles.wrapper} ${styles.started}` }
      data-testid='wrapper'
      >
      <h1 className={styles.title}>Backlog Notification</h1>
      <p className={styles.description}>バックログのお知らせをpush通知します</p>
      {auth.uid ?
        <button
          className={styles.button}
          onClick={()=>{progress.Next()}}
          data-testid='button'
        >設定して利用開始する</button>
        :
        <button
          className={styles.button}
          onClick={()=>{auth.signin()}}
          data-testid='signin-button'
        >ログインして開始する</button>
      }
    </section>
  )
}