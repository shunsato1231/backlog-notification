import React, { useCallback } from 'react'
import { H2 } from '../../../../atoms/Heading/Heading.component'
import { Button } from '../../../../atoms/Button/Button.component'

import styles from './SetApiKey.style.styl'
import { useProgressContext } from '../../../../../Hooks/Progress/Progress.context'
import { useSettingsFormContext } from '../../../../../Hooks/SettingsForm/SettingsForm.context'
import { useBacklogApi } from '../../../../../Hooks/BacklogApi/BacklogApi.hook'
import { H3_Help } from '../../../../molecures/HelpHeading/HelpHeading.component'
import { ValidationForm } from '../../../../molecures/ValidationForm/ValidationForm.component'

export const SetApiKey: React.FC = (): JSX.Element => {
  const progress = useProgressContext()
  const settings = useSettingsFormContext()

  const updateSpaceID = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

    settings.dispatch({
      type: 'CHANGE_SPACE_NAME',
      payload: {
        name: null,
        error: null
      }
    })

    settings.dispatch({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: event.target.value.trim()
      }
    })
  }, [])

  const updateApiKey = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    settings.dispatch({
      type: 'CHANGE_SPACE_NAME',
      payload: {
        name: null,
        error: null
      }
    })

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
        settings.dispatch({
          type: 'CHANGE_SPACE_NAME',
          payload: {
            name: res.name.trim(),
            error: null
          }
        })
      })
      .catch(err => {
        settings.dispatch({
          type: 'CHANGE_SPACE_NAME',
          payload: {
            name: null,
            error: err
          }
        })
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
        <ValidationForm
          className={styles.input}
          theme='initialSetting'
          placeholder='スペースIDを入力'
          value={settings.state.inputs.spaceId}
          errorMessage={settings.state.errors.spaceId}
          errorFlag={settings.state.errors.spaceName ? true : false}
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
      <ValidationForm
        className={styles.input}
        theme='initialSetting'
        placeholder='API Keyを入力'
        value={settings.state.inputs.apiKey}
        errorMessage={settings.state.errors.apiKey}
        errorFlag={settings.state.errors.spaceName ? true : false}
        onChange={updateApiKey}
        data-testid='inputApiKey'
      />
      {
        settings.state.inputs.spaceName
        ?
        <>
          <p className={styles.spaceName}>スペース<span data-testid='spaceName'>{settings.state.inputs.spaceName}</span>の情報を登録します</p>
          <Button
            onClick={progress.Next}
            data-testid='nextButton'
          >次へ</Button>
        </>
        :
        <>
          <p className={styles.error} data-testid='spaceNameError'>{settings.state.errors.spaceName}</p>
          <Button
            disabled={settings.state.errors.apiKey !== null || settings.state.errors.spaceId !== null || !!settings.state.errors.spaceName}
            onClick={getSpaceInfo}
            data-testid='settingsButton'
      >設定する</Button>
        </>
      }
    </div>
  )
}