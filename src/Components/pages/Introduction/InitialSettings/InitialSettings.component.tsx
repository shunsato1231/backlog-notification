import React from 'react'
import styles from './InitialSettings.style.styl'
import { useProgressContext } from '../../../../Hooks/Progress/Progress.context'
import { ProgressBar } from '../../../organisms/ProgressBar/ProgressBar.component'
import { SliderWrapper } from '../../../molecures/SliderWrapper/SliderWrapper.component'
import { SetApiKey } from './SetApiKey/SetApiKey.component'
import { SetUserList } from './SetUserList/SetUserList.component'
import { SettingsConfirm } from './SettingsConfirm/SettingsConfirm.component'

export const InitialSettings: React.FC = (): JSX.Element => {

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
        className={styles.slideWrapper}
        step={progressStep}
        length={progress.progressList.length}
      >
        <SetApiKey />
        <SetUserList/>
        <SettingsConfirm/>
      </SliderWrapper>
    </div>
  )
}