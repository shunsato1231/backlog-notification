import { useFirebase } from "../Firebase/Firebase.hook"
import axios from 'axios'

export const useNotification = async(userId: string) => {
  const { messaging } = useFirebase()

  const permittionNotification = async () => {
    await messaging.requestPermission()
    const token = await messaging.getToken()
    const notificationKey = await getNotificationKey(token)
    
    return notificationKey
  }

  const getNotificationKey = async (token: string) => {
    try {
      const res = await createTokenGroup(token)
      return res
    } catch {
      try {
        const res = await addTokenGroup(token)
        return res
      } catch {
        throw 'トークングループへの登録に失敗しました'
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
    } catch {
      throw 'トークングループの作成に失敗'
    }
  }

  const getNotinotificationKey = async () => {
    const url = process.env.REACT_APP_API_URL_BASE + "/fcm/notification?notification_key_name=" + userId
    let headers = {
      'Content-Type':'application/json',
      'Authorization': 'key=' + process.env.REACT_APP_SERVER_KEY,
      'project_id': process.env.REACT_APP_FIREBASE_SENDER_ID
    }

    try {
      const res = await axios.get(url, {headers: headers, data: {}})
      return res.data
    } catch(error) {
      throw 'NotificationKeyの取得に失敗しました'
    }
  }

  const addTokenGroup = async (token: string) => {
    const url = process.env.REACT_APP_API_URL_BASE + "/fcm/notification"
    const notificationKey = await getNotinotificationKey()
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
    } catch {
      throw 'トークングループへの追加に失敗'
    }
  }

  try {
    const res = await permittionNotification()
    return res.data
  } catch(error) {
    throw error
  }
}