import React, { useCallback } from 'react'
import { H2 } from '../../atoms/Heading/Heading.component'
import { Button } from '../../atoms/Button/Button.component'
import { Input } from '../../atoms/Form/Form.component'

import styles from './SetApiKey.style.styl'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
import { useSettingsFormContext } from '../../../Hooks/SettingsForm/SettingsForm.context'

export const SetApiKey: React.FC = (): JSX.Element => {
  const progress = useProgressContext()
  const settings = useSettingsFormContext()

  const updateApiKey = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    settings.dispatch({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: event.target.value,
      }
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      <H2
        theme='initialSettings'
      >API Keyを入力</H2>
      <Input
        className={styles.input}
        theme='initialSetting'
        placeholder='API Key'
        value={settings.state.inputs.apiKey}
        onChange={updateApiKey}
        data-testid='input'
      />
      <Button
        disabled={settings.state.errors.apiKey !== null}
        onClick={progress.Next}
        data-testid='button'
      >次へ</Button>
    </div>
  )
}