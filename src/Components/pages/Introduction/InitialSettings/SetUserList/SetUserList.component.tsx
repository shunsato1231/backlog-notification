import React, { useEffect, useCallback, useState } from 'react'
import styles from './SetUserList.style.styl'
import { useSettingsFormContext } from '../../../../../Hooks/SettingsForm/SettingsForm.context'
import { Button } from '../../../../atoms/Button/Button.component'
import { useProgressContext } from '../../../../../Hooks/Progress/Progress.context'
import { useBacklogApi } from '../../../../../Hooks/BacklogApi/BacklogApi.hook'
import { useToastContext } from '../../../../../Hooks/Toast/Toast.context'
import { H2 } from '../../../../atoms/Heading/Heading.component'
import { UserSelect, ImageUser } from '../../../../organisms/UserSelect/UserSelect.component'

export const SetUserList: React.FC = () => {
  const progress = useProgressContext()
  const settings = useSettingsFormContext()
  const toast = useToastContext()
  const [allUsers, setAllUsers] = useState<ImageUser[]>()

  useEffect(() => {
    if(progress.currentStep === 2) {
      if(settings.state.inputs.spaceName) {
        useBacklogApi(settings.state.inputs.spaceId, settings.state.inputs.apiKey)
          .getUsers()
          .then(res => {
            setAllUsers(res.map(val => {
              return {
                ...val,
                iconImage: ''
              }
            }))
          })
      } else {
        toast.dispatch({type: 'PUSH_NOTIFICATION', payload: {message: 'API Keyの登録が完了していません'}})
        setTimeout(() => {
          progress.SetNextProgress(1)
        }, 30)
      }
    }
  }, [progress.currentStep])

  const getUserIcon = async (item: ImageUser) => {
    let newAllUsers = allUsers.concat()
    const index = newAllUsers.findIndex(({id}) => id === item.id)
    if(item.iconImage) {
      return item.iconImage
    } else if (item.nulabAccount) {
      return `https://${settings.state.inputs.spaceId}.backlog.jp/NulabAccountIcon.action?userId=${item.id}&amp;name=large`
    } else {
      const img = await useBacklogApi(settings.state.inputs.spaceId, settings.state.inputs.apiKey)
        .getUserIcon(item.id)

      newAllUsers[index] = {
        ...newAllUsers[index],
        iconImage: img
      }
      setAllUsers(newAllUsers)
      return img
    }
  }

  const updateUserList = useCallback((item: ImageUser, index: number) => {
    settings.dispatch({
      type: 'CHANGE_USER_LIST',
      payload: {
        user: item,
        index: index
      }
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      <H2
        theme='initialSettings'
        >通知するユーザを指定</H2>
      <div className={styles.inputList}>
        {settings.state.inputs.userList.map((item, index) => 
          <div className={styles.inputWrapper} key={index}>
            { allUsers
              ? <UserSelect
                  data-testid="select"
                  width='100%'
                  value={item}
                  userList={allUsers}
                  onChange={(item) => updateUserList(item, index)}
                  onAppear={(id) => getUserIcon(id)}
                />
              : ''
            }
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
        onClick={() => {
            settings.dispatch({
              type: 'DELETE_EMPTY_USER_LIST'
            })
            progress.Next()
          }
        }
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