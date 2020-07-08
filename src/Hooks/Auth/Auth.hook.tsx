import firebase from 'firebase/app'
import { useEffect, useState } from 'react'
import { useFirebase } from '../Firebase/Firebase.hook'
import { useLocalStorage } from '../LocalStorage/LocalStorage.hook'

export interface AuthContextType {
  user: any,
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

  const [uid, setUid] = useLocalStorage('uid', null)

  const initialInfo: userInfoType = {
    apiKey: '',
    userList: [''],
    token: ''
  }
  const [info, setInfoState] = useState<userInfoType>(initialInfo)

  useEffect(() => {
    const listener = auth.onAuthStateChanged(
      user => {
        if(user) {
          setUid(user.uid)
        } else {
          setUid(null)
        }
      }
    )

    return () => listener()
  }, [auth])

  const signin = () => {
    let provider = new firebase.auth.GoogleAuthProvider
    return auth
      .signInWithPopup(provider)
      .then(res => {
        setUid(res.user.uid)
        return res.user
      })
  }

  const signout = () => {
    return auth
      .signOut()
      .then(() => {
        setUid(false)
      })
  }

  const setInfo = async () => {
    database
      .collection('users')
      .doc(uid)
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
    user: uid,
    info,
    setApiKey,
    setUserList,
    setToken,
    signin,
    signout
  }
}