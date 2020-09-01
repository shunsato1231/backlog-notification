import React, { useEffect } from 'react'
import { useNotification } from '../../../Hooks/Notification/Notification.hook'
import { useLocalStorage } from '../../../Hooks/LocalStorage/LocalStorage.hook'
import { useAuthContext } from '../../../Hooks/Auth/Auth.context'
import { useToastContext } from '../../../Hooks/Toast/Toast.context'

export const Dashboard: React.FC = (): JSX.Element => {
  const uid = useLocalStorage<string>('uid', null)[0]
  const toast = useToastContext()
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

  const auth = useAuthContext()
  return (
    <>
      <div>Dashboard</div>
      <button
        onClick={() => {auth.signout()}}
      >
        ログアウト
      </button>
    </>
  )
}