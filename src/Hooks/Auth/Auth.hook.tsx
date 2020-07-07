import firebase from 'firebase/app'
import { auth } from 'firebase'
import { useEffect, useState } from 'react'

export interface AuthContextType {
  user: string,
  info: Object,
  setInfo: React.Dispatch<any>,
  signin: () => void,
  signout: () => void
}

export const useAuth = (auth: auth.Auth): AuthContextType => {
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const listener = auth.onAuthStateChanged(
      user => {
        user
          ? setUser(user)
          : setUser(null)
      }
    )

    return () => listener()
  }, [auth])

  const signin = () => {
    let provider = new firebase.auth.GoogleAuthProvider
    return auth
      .signInWithPopup(provider)
      .then(res => {
        setUser(res.user)
        return res.user
      })
  }

  const signout = () => {
    return auth
      .signOut()
      .then(() => {
        setUser(false)
      })
  }

  return {
    user,
    info,
    setInfo,
    signin,
    signout
  }
}