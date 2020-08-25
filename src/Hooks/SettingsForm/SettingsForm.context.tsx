import React from 'react'
import { useSettingsForm, SettingsContextType } from './SettingsForm.hook'
import { createContext, useContext } from 'react'

/* istanbul ignore next */
const defaultSettingContext: SettingsContextType = {
  state: {
    inputs: {
      spaceId: '',
      apiKey: '',
      spaceName: '',
      userList: ['']
    },
    errors: {
      spaceId: null,
      apiKey: null,
      spaceName: null,
      userList: null
    }
  },
  dispatch: () => {}
}

const SettingsFormContext: React.Context<SettingsContextType> = createContext<SettingsContextType>(defaultSettingContext)
export const useSettingsFormContext = (): SettingsContextType => useContext(SettingsFormContext)

interface SettingsFormProviderProps extends React.Props<{}> {
  spaceId: '',
  apiKey: '',
  spaceName: '',
  userList: ['']
}

export const SettingsFormProvider: React.FC<SettingsFormProviderProps> = ({
  spaceId,
  apiKey,
  spaceName,
  userList,
  children
}):JSX.Element => {
  const {state, dispatch}  = useSettingsForm({spaceId, apiKey, spaceName, userList})

  return (
    <SettingsFormContext.Provider value={{state, dispatch}}>
      {children}
    </SettingsFormContext.Provider>
  )
}