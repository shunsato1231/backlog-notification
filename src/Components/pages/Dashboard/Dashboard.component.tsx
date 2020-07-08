import React, { useEffect } from 'react'
import { useNotification } from '../../../Hooks/Notification/Notification.hook'
import { useLocalStorage } from '../../../Hooks/LocalStorage/LocalStorage.hook'

export const Dashboard: React.FC = (): JSX.Element => {
  const uid = useLocalStorage('uid', null)[0]

  useEffect(() => {
    useNotification(uid)
      .then(res => {
        console.log(res)
      })
      .catch((err) => {
        throw err
      })
  }, [])

  return (
    <div>test</div>
  )
}