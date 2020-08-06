import React, { useCallback } from 'react'
import { H2, H3 } from '../../atoms/Heading/Heading.component'
import { Button } from '../../atoms/Button/Button.component'
import { Input } from '../../atoms/Form/Form.component'

import styles from './SetApiKey.style.styl'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
import { useSettingsFormContext } from '../../../Hooks/SettingsForm/SettingsForm.context'

export const SetApiKey: React.FC = (): JSX.Element => {
  const progress = useProgressContext()
  const settings = useSettingsFormContext()

  const updateSpaceID = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    settings.dispatch({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: event.target.value
      }
    })
  }, [])

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
      >API Keyを登録</H2>
      <H3
        theme='initialSettings'
      >スペースID</H3>
      <div>
        <Input
          className={styles.input}
          theme='initialSetting'
          placeholder='スペースIDを入力'
          value={settings.state.inputs.spaceId}
          errorMessage={settings.state.errors.spaceId}
          onChange={updateSpaceID}
          data-testid='inputSpaceId'
        />
      </div>
      <H3 theme='initialSettings'>
        API Key
      </H3>
      <Input
        className={styles.input}
        theme='initialSetting'
        placeholder='API Keyを入力'
        value={settings.state.inputs.apiKey}
        errorMessage={settings.state.errors.apiKey}
        onChange={updateApiKey}
        data-testid='inputApiKey'
      />
      <Button
        disabled={settings.state.errors.spaceId !== null}
        onClick={progress.Next}
        data-testid='button'
      >次へ</Button>
    </div>
  )
}