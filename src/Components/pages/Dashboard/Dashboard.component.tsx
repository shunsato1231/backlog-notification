import React, { useEffect } from 'react'
import { useNotification } from '../../../Hooks/Notification/Notification.hook'
import { useLocalStorage } from '../../../Hooks/LocalStorage/LocalStorage.hook'
import { useAuthContext } from '../../../Hooks/Auth/Auth.context'
import { useToastContext } from '../../../Hooks/Toast/Toast.context'
import Axios from 'axios'
import { Button } from '../../atoms/Button/Button.component'
import styles from './Dashboard.style.styl'

export const Dashboard: React.FC = (): JSX.Element => {
  const uid = useLocalStorage<string>('uid', null)[0]
  const toast = useToastContext()
  const auth = useAuthContext()
  const {notificationKey, isError} = useNotification(uid)

  useEffect(() => {
    if(typeof isError === 'string') {
      toast.dispatch({type: 'PUSH_NOTIFICATION', payload: {message: isError}})
    }
  }, [isError])

  useEffect(() => {
    if(notificationKey) {
      auth.setNotificationKey(notificationKey)
    }
  }, [notificationKey])

  useEffect(() => {
    const url = 'https://' + 'creative-m' + '.backlog.jp/api/v2/space/activities?apiKey=' + 'nR4717OaVID98oN8A95VfbmUbUiwFWTdbOQGLoNOtplykpQACRSOM0S9cbsD1HWq&count=100'
    
    const getNotice = async () => {
      const activities = (await Axios.get(url)).data
  
      console.log(activities)
  
      console.log('-------これを踏まえて------')

      const notificationActivities = activities.filter(item =>
        item.notifications.some(notice => 
          auth.info.userList.some(user => user.id === notice.user.id)
        )
      )

      console.log(notificationActivities)
    }

    getNotice()
  }, [])

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>最近の通知履歴</h2>
      <p className={styles.description}>過去100件の課題中でメンバーに通知があった課題を表示します。</p>
      <p className={styles.list}>現在通知履歴はありません</p>

      <Button
        onClick={() => {auth.signout()}}
      >
        ログアウト
      </Button>
    </div>
  )
}