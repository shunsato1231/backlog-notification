import React from 'react'
import { StepObjType, StepNumType, useProgress } from '../../../Hooks/Progress/Progress.hook'
import { PageTemplate } from '../../templates/PageTemplate/PageTemplate.component'
import { StartView } from '../../organisms/StartView/StartView.component'
import { ProgressContext } from '../../../Hooks/Progress/Progress.context'
import { ProgressBar } from '../../molecures/ProgressBar/ProgressBar.component'
import { SliderWrapper } from '../../organisms/SliderWrapper/SliderWrapper.component'

const styles = require('./Introduction.style.styl')

export const Introduction: React.FC = () => {
  const initialProgressList: StepObjType[] = [
    {
      name: 'API keyの入力',
      status: 'pending'
    },
    {
      name: '通知ユーザの追加',
      status: 'pending'
    },
    {
      name: '確認',
      status: 'pending'
    }
  ]
  const initialStep: StepNumType = 'allPending'
  const progressCtx = useProgress(initialProgressList, initialStep)

  return (
    <ProgressContext.Provider
      value={progressCtx}
    >
      <PageTemplate>
        <StartView></StartView>
        <div 
          className={progressCtx.currentStep === 'allPending' ? `${styles.notStarted} ${styles.wrapper}` : styles.wrapper}
          data-testid="wrapper"
        >
          <ProgressBar wrapperStyle={styles.progressBar}></ProgressBar>
          <SliderWrapper></SliderWrapper>
        </div>
      </PageTemplate>
    </ProgressContext.Provider>
  )
}