import React from 'react'
import { useToast, ToastContextType } from './Toast.hook'
import { createContext, useContext } from 'react'
import { Toast } from './Toast.component'

/* istanbul ignore next */
const defaultSettingContext: ToastContextType = {
  state: {
    notifications: []
  },
  dispatch: () => {}
}

const ToastContext: React.Context<ToastContextType> = createContext<ToastContextType>(defaultSettingContext)
export const useToastContext = (): ToastContextType => useContext(ToastContext)

export const ToastProvider: React.FC = ({
  children
}):JSX.Element => {
  const {state, dispatch}  = useToast()

  return (
    <ToastContext.Provider value={{state, dispatch}}>
      <Toast/>
      {children}
    </ToastContext.Provider>
  )
}