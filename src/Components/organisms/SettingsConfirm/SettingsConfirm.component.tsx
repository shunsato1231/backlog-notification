import React from 'react'
import { useSettingsFormContext } from '../../../Hooks/SettingsForm/SettingsForm.context'
import { Button } from '../../atoms/Button/Button.component'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
import { H2, H3 } from '../../atoms/Heading/Heading.component'
import styles from './SettingsConfirm.style.styl'
import { useToastContext } from '../../../Hooks/Toast/Toast.context'

export const SettingsConfirm: React.FC = () => {
  const settings = useSettingsFormContext()
  const progress = useProgressContext()
  const toast = useToastContext()

  const done = () => {
    toast.dispatch({type: 'PUSH_NOTIFICATION', payload: {message: String(toast.state.notifications.length + 1)}})
  }

  return (
    <div className={styles.wrapper}>
    <H2 theme='initialSettings'>設定内容を確認</H2>
    <H3 theme='initialSettings'>API Key</H3>
      <ul className={styles.list}>
        <li>{settings.state.inputs.apiKey}</li>
      </ul>
    <H3 theme='initialSettings'>通知するユーザ</H3>
      <ul className={styles.list}>
        {settings.state.inputs.userList.map((item, index) =>
          <li key={index}>{item}</li>
        )}
      </ul>
    <Button
      data-testid='done'
      className={styles.done}
      disabled={settings.state.errors.userList !== null}
      onClick={done}
    >
      設定完了
    </Button>
    <Button
      data-testid='back'
      theme='back'
      className={styles.back}
      onClick={progress.Prev}
    >
    </Button>
  </div>
  )
}