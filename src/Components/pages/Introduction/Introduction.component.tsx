import React from 'react'
import { PageTemplate } from '../../templates/PageTemplate/PageTemplate.component'
import { StartView } from '../../organisms/StartView/StartView.component'

export const Introduction: React.SFC = () => {
  return (
    <PageTemplate>
      <StartView></StartView>
    </PageTemplate>
  )
}