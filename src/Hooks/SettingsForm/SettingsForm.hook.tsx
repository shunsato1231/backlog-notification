import React, { useEffect, useRef } from 'react'
import { useReducer } from "react"
import { useLocalStorage } from '../LocalStorage/LocalStorage.hook'

type Settings = {
  spaceId: string,
  apiKey: string,
  spaceName: string,
  userList: string[]
}

interface Action<type, payload = {}, errors = {}> {
  type: type,
  payload?: payload,
  errors?: errors
}

type changeSpaceId = Action<'CHANGE_SPACE_ID', {
  spaceId: string,
}>

type changeApiKey = Action<'CHANGE_API_KEY', {
  apiKey: string,
}>

type changeSpaceName = Action<'CHANGE_SPACE_NAME' , {
  name? : string,
  error? : string
}>

type changeUserList = Action<'CHANGE_USER_LIST', {
  userName: string,
  index: number
}>

type pushUserList = Action<'PUSH_USER_LIST'>
type popUserList = Action<'POP_USER_LIST', {index: number}>

type Actions = changeSpaceId | changeApiKey | changeSpaceName | changeUserList | pushUserList | popUserList

interface State {
  inputs: {
    spaceId: string,
    apiKey: string,
    spaceName: string,
    userList: string[]
  },
  errors: {
    spaceId: string,
    apiKey: string,
    spaceName: string,
    userList: string
  }
}

export const errorMessages = {
  spaceId: 'スペースIDは半角英数・ハイフンからなる3〜10文字で入力してください。',
  apiKey: 'API Keyは64文字の英数字で入力してください。',
  userList: '通知をするユーザ名が入力されていません。'
}

const required = (value: string) => {
  return value === null || value === undefined || value === '' ? false : true
}

const spaceIdPattern = /^[0-9a-zA-Z-]{3,10}$/
const apiKeyPattern = /^[0-9a-zA-Z]{64}$/

const reducer = (state: State, action: Actions): State => {
  switch(action.type) {
    case 'CHANGE_SPACE_ID': {
      return {
        inputs: { ...state.inputs, ...action.payload },
        errors: {
          ...state.errors,
          spaceId: spaceIdPattern.test(action.payload.spaceId) ? null : errorMessages.spaceId
        }
      }
    }

    case 'CHANGE_API_KEY': {
      return {
        inputs: { ...state.inputs, ...action.payload },
        errors: {
          ...state.errors,
          apiKey: apiKeyPattern.test(action.payload.apiKey) ? null : errorMessages.apiKey
        }
      }
    }

    case 'CHANGE_SPACE_NAME': {
      return {
        inputs: {
          ...state.inputs,
          spaceName: action.payload.name
        },
        errors: {
          ...state.errors,
          spaceName: action.payload.error
        }
      }
    }

    case 'CHANGE_USER_LIST': {
      let newUserList = state.inputs.userList
      newUserList[action.payload.index] = action.payload.userName

      let UserListFirst = newUserList.length === 1 ? newUserList[0]
        : newUserList.filter(Boolean)[0]

      return {
        inputs: { ...state.inputs, userList: newUserList},
        errors: {
          ...state.errors,
          userList: required(UserListFirst) ? null : errorMessages.userList
        }
      }
    }

    case 'PUSH_USER_LIST': {
      let pushedUserlist = state.inputs.userList
      pushedUserlist.push('')
      return {
        inputs: {
          ...state.inputs,
          userList: pushedUserlist
        },
        errors: {
          ...state.errors
        }
      }
    }

    case 'POP_USER_LIST': {
      let popedUserList = state.inputs.userList
      popedUserList.splice(action.payload.index, 1)

      let checkPopedUserList = popedUserList.length === 1 ? popedUserList[0]
        : popedUserList.filter(Boolean)[0]

      return {
        inputs: {
          ...state.inputs,
          userList: popedUserList
        },
        errors: {
          ...state.errors,
          userList: required(checkPopedUserList) ? null : errorMessages.userList
        }
      }
    }
  }
}

export interface SettingsContextType {
  state: State,
  dispatch: React.Dispatch<Actions>
}


export const useSettingsForm = (initialState?: Settings): SettingsContextType => {
  const stateType = {
    inputs: initialState || {
      spaceId: '',
      apiKey: '',
      spaceName: '',
      userList: []
    },
    errors: {
      spaceId: errorMessages.spaceId,
      apiKey: errorMessages.apiKey,
      spaceName: '',
      userList: errorMessages.userList
    }
  }
  const didMountRef = useRef(false)

  const [_state, setState] = useLocalStorage<State>('settingsForm', stateType)
  const [state, dispatch] = useReducer(reducer, stateType)

  useEffect(() => {
    dispatch({
      type: 'CHANGE_SPACE_NAME',
      payload: {
        name: _state.inputs.spaceName,
        error: _state.errors.spaceName
      }
    })

    dispatch({
      type: 'CHANGE_SPACE_ID',
      payload: {
        spaceId: _state.inputs.spaceId
      }
    })

    dispatch({
      type: 'CHANGE_API_KEY',
      payload: {
        apiKey: _state.inputs.apiKey,
      }
    })
  }, [])

  useEffect(() => {
    if(didMountRef.current) {
      setState(state)
    } else {
      didMountRef.current = true
    }
  }, [state])

  return {state, dispatch}
}
