import React from 'react'
import useProgress, { ProgressContextType, StepObjType, StepNumType } from "./Introduction.hook"
import { createContext, useContext } from 'react'

const defaultProgressContext: ProgressContextType = {
  progressList: [],
  currentStep: 'allPending',
  direction: 'next',
  Next: () => {},
  Prev: () => {},
  SetNextProgress: () => {}
}

const ProgressContext = createContext<ProgressContextType>(defaultProgressContext)
export const useProgressContext = () => useContext(ProgressContext)

const initialProgressList: StepObjType[] = [
  {
    name: 'step1',
    status: 'pending'
  },
  {
    name: 'step2',
    status: 'pending'
  },
  {
    name: 'step3',
    status: 'pending'
  }
]
const initialStep: StepNumType = 'allPending'

export const ProgressProvider: React.SFC = ({children}) => {
  const progressCtx = useProgress(initialProgressList, initialStep);
  return (
    <ProgressContext.Provider value={progressCtx}>
      {children}
    </ProgressContext.Provider>
  )
}