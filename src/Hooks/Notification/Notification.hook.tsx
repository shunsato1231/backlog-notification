import { useFirebase } from "../Firebase/Firebase.hook"
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useNotification = (userId: string) => {
  const { messaging } = useFirebase()
  let notificationKey: string
  const [isError, setIsError] = useState<boolean | string>(false)

  const permittionNotification = async () => {
    await messaging.usePublicVapidKey(process.env.REACT_APP_PUBLIC_VAPID_KEY)
    await messaging.requestPermission().catch((error) => {
      setIsError('通知の許可を取れませんでした')
      throw error
    })
    const token = await messaging.getToken().catch((error) => {
      setIsError('トークンの取得に失敗しました')
      throw error
    })
    const notificationKey = await registorTokenGroup(token).catch((error) => {
      setIsError('NotificationKeyの取得に失敗しました')
      throw error
    })
    
    return notificationKey
  }

  const registorTokenGroup = async (token: string) => {
    try {
      const res = await createTokenGroup(token)
      return res
    } catch {
      try {
        const res = await addTokenGroup(token)
        return res
      } catch (error) {
        throw error
      }
    }
  }

  const createTokenGroup = async (token: string) => {
    const url = process.env.REACT_APP_API_URL_BASE + "/fcm/notification"
    const data = {
      "operation": "create",
      "notification_key_name": userId,
      "registration_ids": [token]
    }
    let headers = {
      'Authorization': 'key=' + process.env.REACT_APP_SERVER_KEY,
      'project_id': process.env.REACT_APP_FIREBASE_SENDER_ID
    }

    try {
      // @ts-ignore
      const res = await axios.post(url, data, {headers: headers, useCredentails: true})
      return res.data
    } catch (error) {
      throw error
    }
  }

  const getNotificationKey = async () => {
    const url = process.env.REACT_APP_API_URL_BASE + "/fcm/notification?notification_key_name=" + userId
    let headers = {
      'Content-Type':'application/json',
      'Authorization': 'key=' + process.env.REACT_APP_SERVER_KEY,
      'project_id': process.env.REACT_APP_FIREBASE_SENDER_ID
    }

    try {
      const res = await axios.get(url, {headers: headers, data: {}})
      return res.data
    } catch (error) {
      throw error
    }
  }

  const addTokenGroup = async (token: string) => {
    const url = process.env.REACT_APP_API_URL_BASE + "/fcm/notification"
    const notificationKey = await getNotificationKey()
    const data = {
      "operation": "add",
      "notification_key_name": userId,
      "notification_key": notificationKey,
      "registration_ids": [token]
    }
    let headers = {
      'Authorization': 'key=' + process.env.REACT_APP_SERVER_KEY,
      'project_id': process.env.REACT_APP_FIREBASE_SENDER_ID
    }

    try {
      // @ts-ignore
      const res = await axios.post(url, data, {headers: headers, useCredentails: true})
      return res.data
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const fnc = async() => {
      if ('serviceWorker' in navigator) {
        await navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then(reg => messaging.useServiceWorker(reg))
          .catch((error: Error) => {
            setIsError('ServiceWorkerの登録に失敗しました')
            throw error
          })
      }

      await permittionNotification()
        .then(res => {
          notificationKey = res.data
        })
        .catch((error: Error) => {
          throw error
        })
    }
    fnc()
  }, [])

  return {
    notificationKey,
    isError
  }
}