import React from 'react'
import {StepObjType, StepNumType } from '../../../Hooks/Progress/Progress.hook'
import { PageTemplate } from '../../templates/PageTemplate/PageTemplate.component'
import { StartView } from '../../organisms/StartView/StartView.component'
import { ProgressProvider } from '../../../Hooks/Progress/Progress.context'
import { InitialSettings } from '../../organisms/InitialSettings/InitialSettings.component'
import { SettingsFormProvider } from '../../../Hooks/SettingsForm/SettingsForm.context'

export const Introduction: React.FC = (): JSX.Element => {
  const initialProgressList: StepObjType[] = [
    {
      name: 'API keyの入力',
      status: 'pending'
    },
    {
      name: '通知ユーザの追加',
      status: 'pending'
    },
    {
      name: '確認',
      status: 'pending'
    }
  ]
  const initialStep: StepNumType = 'allPending'

  return (
    <ProgressProvider
      list={initialProgressList}
      step={initialStep}
    >
    <SettingsFormProvider
      apiKey={''}
      userList={['']}
    >
      <PageTemplate>
        <StartView></StartView>
        <InitialSettings></InitialSettings>
      </PageTemplate>
    </SettingsFormProvider>
    </ProgressProvider>

  )
}