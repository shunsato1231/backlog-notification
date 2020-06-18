import React from 'react'
import useProgress, { ProgressContextType, StepObjType, StepNumType } from "./Progress.hook"
import { createContext, useContext } from 'react'

/* istanbul ignore next */
const defaultProgressContext: ProgressContextType = {
  progressList: [],
  currentStep: 'allPending',
  direction: 'next',
  Next: () => {},
  Prev: () => {},
  SetNextProgress: () => {},
  hashChange: () => {}
}

export const ProgressContext = createContext<ProgressContextType>(defaultProgressContext)
export const useProgressContext = () => useContext(ProgressContext)

type Props = {
  list: StepObjType[],
  step: StepNumType
}

export const ProgressProvider: React.FC<Props> = ({children, list, step}) => {
  const progressCtx = useProgress(list, step);
  return (
    <ProgressContext.Provider value={progressCtx}>
      {children}
    </ProgressContext.Provider>
  )
}