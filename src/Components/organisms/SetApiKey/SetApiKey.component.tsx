import React, { useCallback, useState } from 'react'
import { H2 } from '../../atoms/Heading/Heading.component'
import { Button } from '../../atoms/Button/Button.component'
import { Input } from '../../atoms/Form/Form.component'

import styles from './SetApiKey.style.styl'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'
import { useSettingsFormContext } from '../../../Hooks/SettingsForm/SettingsForm.context'
import { useBacklogApi } from '../../../Hooks/BacklogApi/BacklogApi.hook'
import { H3_Help } from '../../molecures/HelpHeading/HelpHeading.component'

export const SetApiKey: React.FC = (): JSX.Element => {
  const progress = useProgressContext()
  const settings = useSettingsFormContext()

  const [spaceName, setSpaceName] = useState<string>(null)
  const [isError, setIsError] = useState<string>(null)

  const updateSpaceID = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceName(null)
    setIsError(null)

    settings.dispatch({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: event.target.value.trim()
      }
    })
  }, [])

  const updateApiKey = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceName(null)
    setIsError(null)

    settings.dispatch({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: event.target.value.trim(),
      }
    })
  }, [])

  const getSpaceInfo = (): void => {
    useBacklogApi(settings.state.inputs.spaceId, settings.state.inputs.apiKey)
      .getSpace()
      .then(res => {
        setSpaceName(res.data.name.trim())
        setIsError(null)
      })
      .catch(err => {
        setSpaceName(null)
        setIsError(err)
      })
  }

  return (
    <div className={styles.wrapper}>
      <H2 theme='initialSettings'>API Keyを登録</H2>
      <H3_Help
        theme='initialSettings'
        helpLink='https://support-ja.backlog.com/hc/ja/articles/360036151593-%E3%82%B9%E3%83%9A%E3%83%BC%E3%82%B9ID%E3%81%A8%E3%81%AF-'
      >
        スペースID
      </H3_Help>
      <div>
        <Input
          className={styles.input}
          theme='initialSetting'
          placeholder='スペースIDを入力'
          value={settings.state.inputs.spaceId}
          errorMessage={settings.state.errors.spaceId}
          errorFlag={isError ? true : false}
          onChange={updateSpaceID}
          data-testid='inputSpaceId'
        />
      </div>
      <H3_Help
        theme='initialSettings'
        helpLink='https://support-ja.backlog.com/hc/ja/articles/360035641754-API%E3%81%AE%E8%A8%AD%E5%AE%9A'
      >
        API Key
      </H3_Help>
      <Input
        className={styles.input}
        theme='initialSetting'
        placeholder='API Keyを入力'
        value={settings.state.inputs.apiKey}
        errorMessage={settings.state.errors.apiKey}
        errorFlag={isError ? true : false}
        onChange={updateApiKey}
        data-testid='inputApiKey'
      />
      {
        spaceName
        ?
        <>
          <p className={styles.spaceName}>スペース<span data-testid='space-name'>{spaceName}</span>の情報を登録します</p>
          <Button
            onClick={progress.Next}
            data-testid='nextButton'
          >次へ</Button>
        </>
        :
        <>
          <p className={styles.error} data-testid='isError'>{isError}</p>
          <Button
            disabled={settings.state.errors.apiKey !== null || settings.state.errors.spaceId !== null || !!isError}
            onClick={getSpaceInfo}
            data-testid='settingsButton'
      >設定する</Button>
        </>
      }
    </div>
  )
}