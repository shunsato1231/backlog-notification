import React from 'react'
import { AuthContextType, useAuth } from "./Auth.hook"
import { createContext, useContext } from 'react'

/* istanbul ignore next */
const defaultAuthContext: AuthContextType = {
  user: '',
  info: '',
  setApiKey: async () => {},
  setUserList: async () => {},
  setToken: async () => {},
  signin: () => {},
  signout: () => {}
}

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>(defaultAuthContext)
export const useAuthContext = (): AuthContextType => useContext(AuthContext)

export const AuthProvider: React.FC = ({
  children,
}): JSX.Element => {
  const authCtx = useAuth()
  return (
    <AuthContext.Provider value={authCtx}>
      {children}
    </AuthContext.Provider>
  )
}