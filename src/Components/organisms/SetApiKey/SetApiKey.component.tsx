import React from 'react'
import { H2 } from '../../atoms/Heading/Heading.component'
import { Button } from '../../atoms/Button/Button.component'
import { Input } from '../../atoms/Form/Form.component'

import styles from './SetApiKey.style.styl'
import { useInput } from '../../../Hooks/Input/Input.hook'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'

export const SetApiKey: React.FC = (): JSX.Element => {
  const progress = useProgressContext()
  const apiKey = useInput('')
  console.log(apiKey)

  return (
    <div>
      <H2 type='initialSetting-h2'>API Keyを入力</H2>
      <Input
        className={styles.input}
        theme='initialSetting'
        placeholder='API Key'
        {...apiKey}
      />
      <Button
        onClick={progress.Next}
      >次へ</Button>
    </div>
  )
}