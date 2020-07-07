import React from 'react'
import { AuthContextType, useAuth } from "./Auth.hook"
import { createContext, useContext } from 'react'
import { useFirebase } from '../Firebase/Firebase.hook'

/* istanbul ignore next */
const defaultAuthContext: AuthContextType = {
  user: '',
  info: '',
  setInfo: () => {},
  signin: () => {},
  signout: () => {}
}

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>(defaultAuthContext)
export const useAuthContext = (): AuthContextType => useContext(AuthContext)

export const AuthProvider: React.FC = ({
  children,
}): JSX.Element => {
  const { auth } = useFirebase()
  const authCtx = useAuth(auth)
  return (
    <AuthContext.Provider value={authCtx}>
      {children}
    </AuthContext.Provider>
  )
}