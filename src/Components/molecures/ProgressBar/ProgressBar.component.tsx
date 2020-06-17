import React from 'react'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
const styles = require('./ProgressBar.style.styl')

type Props = {
  wrapperStyle?: any
}

export const ProgressBar: React.FC<Props> = (props) => {

  const progress = useProgressContext()

  return(
    <>
      <div className={`${styles.wrapper} ${styles[progress.direction]} ${props.wrapperStyle}`}>
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

ProgressBar.defaultProps ={
  wrapperStyle: ''
}