import React from 'react'
import { PageTemplate } from '../../templates/PageTemplate/PageTemplate.component'
import { StartView } from '../../organisms/StartView/StartView.component'
import { ProgressProvider } from './Introduction.context'

export const Introduction: React.SFC = () => {
  return (
    <ProgressProvider>
      <PageTemplate>
        <StartView></StartView>
      </PageTemplate>
    </ProgressProvider>
  )
}