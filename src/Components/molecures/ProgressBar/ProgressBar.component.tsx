import React from 'react'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
const styles = require('./ProgressBar.style.styl')

export const ProgressBar: React.SFC = () => {

  const progress = useProgressContext()

  return(
    <>
      <div className={`${styles.wrapper} ${styles[progress.direction]}`}>
        {progress.progressList.map((item, index) =>
          <div className={`${styles.item} ${styles[item.status]}`} key={item.name}>
            <div className={styles.step}>
              <div className={styles.checkBefore}></div>
              <p className={styles.description}>{item.name}</p>
              <div className={styles.checkAfter}></div>
            </div>
            {progress.progressList.length !== index + 1 &&
              <div className={styles.line}></div>
            }
          </div>
        )}
      </div>
      <button onClick={()=>{progress.Next()}}>next</button>
      <button onClick={()=>{progress.Prev()}}>prev</button>
    </>
  )
}