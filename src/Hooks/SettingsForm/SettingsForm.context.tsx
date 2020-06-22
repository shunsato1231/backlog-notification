import React from 'react'
import { useSettingsForm, SettingsContextType } from './SettingsForm.hook'
import { createContext, useContext } from 'react'

/* istanbul ignore next */
const defaultSettingContext: SettingsContextType = {
  state: {
    inputs: {
      apiKey: '',
      userList: ['']
    },
    errors: {
      apiKey: null,
      userList: null
    }
  },
  dispatch: () => {}
}

const SettingsFormContext: React.Context<SettingsContextType> = createContext<SettingsContextType>(defaultSettingContext)
export const useSettingsFormContext = (): SettingsContextType => useContext(SettingsFormContext)

interface SettingsFormProviderProps extends React.Props<{}> {
  apiKey: '',
  userList: ['']
}

export const SettingsFormProvider: React.FC<SettingsFormProviderProps> = ({
  apiKey,
  userList,
  children
}):JSX.Element => {
  const {state, dispatch}  = useSettingsForm({apiKey, userList})

  return (
    <SettingsFormContext.Provider value={{state, dispatch}}>
      {children}
    </SettingsFormContext.Provider>
  )
}