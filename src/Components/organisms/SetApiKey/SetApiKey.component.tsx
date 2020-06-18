import React from 'react'
import { H2 } from '../../atoms/Heading/Heading.component'
import { Button } from '../../atoms/Button/Button.component'
import { Input } from '../../atoms/Form/Form.component'

import styles from './SetApiKey.style.styl'

export const SetApiKey: React.FC = () => {
  return (
    <div>
      <H2 type='initialSetting-h2'>API Keyを入力</H2>
      <Input
        className={styles.input}
        theme='initialSetting'
        placeholder='API Key'
      />
      <Button>次へ</Button>
    </div>
  )
}