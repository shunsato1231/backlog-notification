import firebase from 'firebase/app'
import { useEffect, useState } from 'react'
import { useFirebase } from '../Firebase/Firebase.hook'

export interface AuthContextType {
  user: string,
  info: Object,
  setApiKey: (apiKey: string) => Promise<void>,
  setUserList: (userList: string[]) => Promise<void>,
  setToken: (token: string) => Promise<void>,
  signin: () => void,
  signout: () => void
}

type userInfoType = {
  apiKey: string,
  userList: string[],
  token: string
}

export const useAuth = (): AuthContextType => {
  const { auth, database } = useFirebase()

  const [user, setUser] = useState(null)
  const initialInfo: userInfoType = {
    apiKey: '',
    userList: [''],
    token: ''
  }
  const [info, setInfoState] = useState<userInfoType>(initialInfo)

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

  const setInfo = async () => {
    database
      .collection('users')
      .doc(user.uid)
      .set(info)
  }

  const setApiKey = async (apiKey: string) => {
    let newInfo = info
    newInfo.apiKey = apiKey

    setInfoState(newInfo)

    await setInfo()
  }

  const setUserList = async (userList: string[]) => {
    let newInfo = info
    newInfo.userList = userList

    setInfoState(newInfo)

    await setInfo()
  }

  const setToken = async (token: string) => {
    let newInfo = info
    newInfo.token = token

    setInfoState(newInfo)
    await setInfo()
  }

  return {
    user,
    info,
    setApiKey,
    setUserList,
    setToken,
    signin,
    signout
  }
}