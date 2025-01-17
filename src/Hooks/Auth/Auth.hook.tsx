import firebase from 'firebase/app'
import { useEffect } from 'react'
import { ImageUser } from '../../Components/organisms/UserSelect/UserSelect.component'
import { useFirebase } from '../Firebase/Firebase.hook'
import { useLocalStorage } from '../LocalStorage/LocalStorage.hook'

export interface AuthContextType {
  uid: string,
  info: userInfoType,
  setSpaceId: (spaceId: string) => Promise<void>,
  setApiKey: (apiKey: string) => Promise<void>,
  setUserList: (userList: ImageUser[]) => Promise<void>,
  setNotificationKey: (notificationKey: string) => Promise<void>,
  signin: () => void,
  signout: () => void
}

export type userInfoType = {
  spaceId: string,
  apiKey: string,
  userList: ImageUser[],
  notificationKey: string
}

export const useAuth = (): AuthContextType => {
  const { auth, database } = useFirebase()

  const [uid, setUid] = useLocalStorage<string>('uid', null)

  const initialInfo: userInfoType = {
    spaceId: '',
    apiKey: '',
    userList: [null],
    notificationKey: ''
  }
  const [info, setInfoState] = useLocalStorage<userInfoType>('info', initialInfo)

  useEffect(() => {
    const listener = auth.onAuthStateChanged(
      async (user) => {
        if(user) {
          await setUid(user.uid)
        } else {
          await setUid(null)
          await setInfoState(initialInfo)
        }
      }
    )

    return () => listener()
  }, [auth])

  useEffect(() => {
    const fnc = async () => {
      if(uid) {
        getInfo()
      } else {
        await setInfoState(initialInfo)
      }
    }

    fnc()
  }, [uid])

  const signin = () => {
    let provider = new firebase.auth.GoogleAuthProvider
    return auth
      .signInWithPopup(provider)
      .then(async (res) => {
        await setUid(res.user.uid)
        return res.user
      })
  }

  const signout = () => {
    return auth
      .signOut()
      .then(async () => {
        await setUid(null)
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

      const data = snapshot.data()
        ? snapshot.data() as userInfoType
        : initialInfo

      await setInfoState(data)
  }

  const setSpaceId = async (spaceId: string) => {
    let newInfo = info
    newInfo.spaceId = spaceId

    await setInfoState(newInfo)
    await setInfo()
  }

  const setApiKey = async (apiKey: string) => {
    let newInfo = info
    newInfo.apiKey = apiKey

    await setInfoState(newInfo)
    await setInfo()
  }

  const setUserList = async (userList: ImageUser[]) => {
    let newInfo = info
    newInfo.userList = userList

    await setInfoState(newInfo)
    await setInfo()
  }

  const setNotificationKey = async (notificationKey: string) => {
    let newInfo = info
    newInfo.notificationKey = notificationKey

    await setInfoState(newInfo)
    await setInfo()
  }

  return {
    uid,
    info,
    setSpaceId,
    setApiKey,
    setUserList,
    setNotificationKey,
    signin,
    signout
  }
}