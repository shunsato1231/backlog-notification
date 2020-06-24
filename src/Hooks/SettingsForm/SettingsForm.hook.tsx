import React from 'react'
import { useReducer } from "react"

type Settings = {
  apiKey: string,
  userList: string[]
}

interface Action<type, payload = {}, errors = {}> {
  type: type,
  payload?: payload,
  errors?: errors
}

type changeApiKey = Action<'CHANGE_API_KEY', {
  apiKey: string,
}>

type changeUserList = Action<'CHANGE_USER_LIST', {
  userName: string,
  index: number
}>

type pushUserList = Action<'PUSH_USER_LIST'>
type popUserList = Action<'POP_USER_LIST', {index: number}>

type Actions = changeApiKey | changeUserList | pushUserList | popUserList

interface State {
  inputs: {
    apiKey: string,
    userList: string[]
  },
  errors: {
    apiKey: string,
    userList: string
  }
}

export const errorMessages = {
  apiKey: 'API Keyが入力されていません。',
  userList: '通知をするユーザ名が入力されていません。'
}

const required = (value) => {
  return value === null || value === undefined || value === '' ? false : true
}

const reducer = (state: State, action: Actions): State => {
  switch(action.type) {
    case 'CHANGE_API_KEY': {
      return {
        inputs: { ...state.inputs, ...action.payload},
        errors: {
          ...state.errors,
          apiKey: required(action.payload.apiKey) ? null : errorMessages.apiKey
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
          apiKey: state.inputs.apiKey,
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
          apiKey: state.inputs.apiKey,
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
  const [state, dispatch] = useReducer(reducer, {
      inputs: initialState || {
        apiKey: '',
        userList: []
      },
      errors: {
        apiKey: errorMessages.apiKey,
        userList: errorMessages.userList
      }
  })

  return {state, dispatch}
}
