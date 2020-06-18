import React from 'react'
import { H2 } from '../../atoms/Heading/Heading.component'
import { Button } from '../../atoms/Button/Button.component'

export const SetApiKey: React.FC = () => {
  return (
    <div>
      <H2 type='initialSetting-h2'>API Keyを入力</H2>
      <Button>次へ</Button>
    </div>
  )
}