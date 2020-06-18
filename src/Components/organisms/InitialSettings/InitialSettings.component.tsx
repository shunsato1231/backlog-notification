import React from 'react'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
import { ProgressBar } from '../ProgressBar/ProgressBar.component'
import { SliderWrapper } from '../../molecures/SliderWrapper/SliderWrapper.component'
import styles from './InitialSettings.style.styl'
import { SetApiKey } from '../SetApiKey/SetApiKey.component'

export const InitialSettings: React.FC = () => {

  const progress = useProgressContext()

  const progressStep = progress.currentStep === 'allPending' ? 0
                     : progress.currentStep === 'finish' ? progress.progressList.length
                     : progress.currentStep

  return(
    <div
      className={progress.currentStep === 'allPending' ? `${styles.notStarted} ${styles.wrapper}` : styles.wrapper}
      data-testid='wrapper'
    >
      <ProgressBar className={styles.progressBar}></ProgressBar>
      <SliderWrapper
        step={progressStep}
        length={progress.progressList.length}
      >
        <SetApiKey />
        <div>おねがいします</div>
        <div>おねがいします</div>
      </SliderWrapper>
    </div>
  )
}