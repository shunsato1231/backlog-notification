import React from 'react'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'

const styles = require('./SliderWrapper.style.styl')

type Props = {
  wrapperStyle?: any
}

export const SliderWrapper: React.FC<Props> = (props, {children}) => {

  const progress = useProgressContext()

  const progressStep = progress.currentStep === 'allPending' ? '0'
                     : progress.currentStep === 'finish' ? String(progress.progressList.length)
                     : String(progress.currentStep)

  const styleVar = {
    '--step'  : progressStep,
    '--length': progress.progressList.length
  }

  return (
    <div className={`${styles.wrapper} ${props.wrapperStyle}`} style={styleVar as React.CSSProperties}>
      {children}
    </div>
  )
}

SliderWrapper.defaultProps = {
  wrapperStyle: ''
}