import React, { useCallback } from 'react'
import { H2 } from '../../atoms/Heading/Heading.component'
import styles from './SetUserList.style.styl'
import { useSettingsFormContext } from '../../../Hooks/SettingsForm/SettingsForm.context'
import { Input } from '../../atoms/Form/Form.component'
import { Button } from '../../atoms/Button/Button.component'
import { useProgressContext } from '../../../Hooks/Progress/Progress.context'

export const SetUserList: React.FC = () => {
  const progress = useProgressContext()
  const settings = useSettingsFormContext()
  const updateUserList = useCallback((event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    settings.dispatch({
      type: 'CHANGE_USER_LIST',
      payload: {
        userName: event.target.value,
        index: index
      }
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      <H2 theme='initialSettings'>通知するユーザを指定</H2>
      <div className={styles.inputList}>
        {settings.state.inputs.userList.map((item, index) => 
          <div className={styles.inputWrapper} key={index}>
            <Input
              data-testid='inputUser'
              className={styles.input}
              theme='initialSetting'
              value = {item}
              onChange = {(event: React.ChangeEvent<HTMLInputElement>) => updateUserList(event, index)}
            />
            {settings.state.inputs.userList.length > 1 && <Button
              data-testid='delete'
              theme='delete'
              className={styles.deleteButton}
              onClick={() => settings.dispatch({
                type: 'POP_USER_LIST',
                payload: {
                  index: index
                }
              })}
              ></Button>}
          </div>
        )}
        {settings.state.inputs.userList.length < 5 ? (
          <div className={styles.dummyInput}>
            <Button
              data-testid='add'
              theme='add'
              className={styles.addButton}
              onClick={() => settings.dispatch({
                type: 'PUSH_USER_LIST'
              })}
              ></Button>
          </div>
        ) : ''}
      </div>
      <Button
        data-testid='next'
        className={styles.next}
        disabled={settings.state.errors.userList !== null}
        onClick={progress.Next}
      >
        次へ
      </Button>

      <Button
        data-testid='back'
        theme='back'
        className={styles.back}
        onClick={progress.Prev}
      >
      </Button>
    </div>
  )
}