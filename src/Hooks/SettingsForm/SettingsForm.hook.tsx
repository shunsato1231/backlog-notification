import React from 'react'
import { useReducer } from "react"

type Settings = {
  apiKey: string,
  userList: string[]
}

interface Action<type, payload, errors = {}> {
  type: type,
  payload: payload,
  errors?: errors
}

type changeSettings = Action<'CHANGE_SETTINGS', Partial<{
  apiKey: string,
  userList: string[]
}>>
type Actions = changeSettings

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
    case 'CHANGE_SETTINGS': 

      let checkPayloadUserList = action.payload.userList === undefined ? undefined 
        : action.payload.userList.length === 1 ? action.payload.userList[0]
        : action.payload.userList.filter(Boolean)[0]

      return {
        inputs: { ...state.inputs, ...action.payload},
        errors: {
          ...state.errors,
          apiKey: action.payload.apiKey || action.payload.apiKey === ''
            ? required(action.payload.apiKey) ? null : errorMessages.apiKey
            : required(state.inputs.apiKey) ? null : errorMessages.apiKey,

          userList: checkPayloadUserList || checkPayloadUserList === ''
            ? required(checkPayloadUserList) ? null : errorMessages.userList
            : required(state.inputs.userList.filter(Boolean)[0]) ? null :errorMessages.userList
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
