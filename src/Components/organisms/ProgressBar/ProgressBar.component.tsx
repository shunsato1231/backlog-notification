import React from 'react'
import styles from './ProgressBar.style.styl'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'

interface ProgressProps extends React.Props<{}> {
  className?: any
}

export const ProgressBar: React.FC<ProgressProps> = ({
    className
  }) => {

  const progress = useProgressContext()

  return(
    <>
      <div className={`${styles.wrapper} ${styles[progress.direction]} ${className || ''}`}>
        {progress.progressList.map((item, index) =>
          <div 
            className={`${styles.item} ${styles[item.status]}`}
            key={item.name}
            data-testid='step'
          >
            <div className={styles.step}>
              <div className={styles.checkBefore}></div>
              <p className={styles.description} data-testid='description'>{item.name}</p>
              <div className={styles.checkAfter}></div>
            </div>
            {progress.progressList.length !== index + 1 &&
              <div className={styles.line}></div>
            }
          </div>
        )}
      </div>
    </>
  )
}