import firebase from 'firebase/app'
import { useEffect } from 'react'
import { useFirebase } from '../Firebase/Firebase.hook'
import { useLocalStorage } from '../LocalStorage/LocalStorage.hook'

export interface AuthContextType {
  user: any,
  info: userInfoType,
  setApiKey: (apiKey: string) => Promise<void>,
  setUserList: (userList: string[]) => Promise<void>,
  setNotificationKey: (notificationKey: string) => Promise<void>,
  signin: () => void,
  signout: () => void
}

export type userInfoType = {
  apiKey: string,
  userList: string[],
  notificationKey: string
}

export const useAuth = (): AuthContextType => {
  const { auth, database } = useFirebase()

  const [uid, setUid] = useLocalStorage('uid', null)

  const initialInfo: userInfoType = {
    apiKey: '',
    userList: [''],
    notificationKey: ''
  }
  const [info, setInfoState] = useLocalStorage('info', initialInfo)

  useEffect(() => {
    const listener = auth.onAuthStateChanged(
      user => {
        if(user) {
          setUid(user.uid)
          getInfo()
        } else {
          setUid(null)
          setInfoState(initialInfo)
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

  const getInfo = async () => {
    const snapshot = await database
      .collection('users')
      .doc(uid)
      .get()

      setInfoState(snapshot.data() as userInfoType)
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

  const setNotificationKey = async (notificationKey: string) => {
    let newInfo = info
    newInfo.notificationKey = notificationKey

    setInfoState(newInfo)
    await setInfo()
  }

  return {
    user: uid,
    info,
    setApiKey,
    setUserList,
    setNotificationKey,
    signin,
    signout
  }
}