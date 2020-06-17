import { ProgressContextType } from "./Progress.hook"
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