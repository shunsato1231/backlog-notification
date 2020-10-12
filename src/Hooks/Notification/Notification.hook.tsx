import { useFirebase } from "../Firebase/Firebase.hook"
import axios from 'axios'
import { useEffect, useState } from 'react'

export const errorMessages = {
  permission: '通知の許可を取れませんでした',
  token: 'トークンの取得に失敗しました',
  createTokenGroup: 'トークンブループの作成に失敗しました',
  getNotificationKey: '通知キーの取得に失敗しました',
  addTokenGroup: 'トークンブループの追加に失敗しました'
}

export const useNotification = (userId: string) => {
  const { messaging, initializeApp } = useFirebase()
  const [notificationKey, setNotificationKey] = useState<string>(null)
  const [isError, setIsError] = useState<string>(null)

  const permittionNotification = async () => {
    await messaging.requestPermission().catch(() => {
      throw errorMessages.permission
    })

    const token = await messaging.getToken().catch(() => {
      throw errorMessages.token
    })

    const notificationKey = await registorTokenGroup(token).catch((error) => {
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
    const url = "firebase-api/fcm/notification"
    const data = {
      "operation": "create",
      "notification_key_name": userId,
      "registration_ids": [token]
    }
    const headers = {
      'Authorization': 'key=' + process.env.REACT_APP_FIREBASE_SERVER_KEY,
      'project_id': process.env.REACT_APP_FIREBASE_SENDER_ID
    }

    try {
      const res = await axios({
        method: "POST",
        url: url,
        data: data,
        headers: headers,
        withCredentials: true
      })
      return res.data["notification_key"]
    } catch (error) {
      throw errorMessages.createTokenGroup
    }
  }

  const getNotificationKey = async () => {
    const url = "firebase-api/fcm/notification?notification_key_name=" + userId
    const headers = {
      'Content-Type':'application/json',
      'Authorization': 'key=' + process.env.REACT_APP_FIREBASE_SERVER_KEY,
      'project_id': process.env.REACT_APP_FIREBASE_SENDER_ID
    }

    try {
      const res = await axios({
        method: "GET",
        url: url,
        headers: headers,
        data: {}
      })
      return res.data["notification_key"]
    } catch (error) {
      console.error(error)
      throw errorMessages.getNotificationKey
    }
  }

  const addTokenGroup = async (token: string) => {
    const url = "firebase-api/fcm/notification"
    const notificationKey = await getNotificationKey()
    const data = {
      "operation": "add",
      "notification_key_name": userId,
      "notification_key": notificationKey,
      "registration_ids": [token]
    }
    let headers = {
      'Authorization': 'key=' + process.env.REACT_APP_FIREBASE_SERVER_KEY,
      'project_id': process.env.REACT_APP_FIREBASE_SENDER_ID
    }

    try {
      const res = await axios({
        method: "POST",
        url: url,
        data: data,
        headers: headers,
        withCredentials: true
      })
      return res.data["notification_key"]
    } catch (error) {
      console.error(error)
      throw errorMessages.addTokenGroup
    }
  }

  useEffect(() => {
    const fnc = async() => {
      await permittionNotification()
        .then(res => {
          setNotificationKey(res)
        })
        .catch((error) => {
          setIsError(error)
        })
    }
    fnc()
  }, [])

  const serviceWorker = navigator.serviceWorker
  useEffect(() => {
    if (serviceWorker && initializeApp) {
      window.addEventListener('load', async () => {
        await serviceWorker.register('/firebase-messaging-sw.js')
        const registration = await serviceWorker.ready
        await messaging.useServiceWorker(registration)
        await messaging.usePublicVapidKey(process.env.REACT_APP_FIREBASE_PUBLIC_VAPID_KEY)
      })
    }
  }, [serviceWorker])

  return {
    notificationKey,
    isError
  }
}