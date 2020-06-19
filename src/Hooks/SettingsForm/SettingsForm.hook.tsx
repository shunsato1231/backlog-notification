import { useReducer } from "react"

type Settings = {
  apiKey: string,
  userList: string[]
}

interface Action<type, peyload, errors = {}> {
  type: type,
  payload: peyload,
  errors?: errors
}

type changeSettings = Action<'CHANGE_SETTINGS', {
  apiKey: string,
  userList: string[]
}>
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

const required = (value) => {
  return value === null || value === undefined || value === '' || typeof value === 'number' && isNaN(value) ? false : true
}

const reducer = (state: State, action: Actions): State => {
  switch(action.type) {
    case 'CHANGE_SETTINGS': return {
      inputs: { ...state.inputs, ...action.payload},
      errors: {
        ...state.errors,
        apiKey: action.payload.apiKey || action.payload.apiKey === ''
          ? required(state.inputs.apiKey)   ? null : 'API Keyが入力されていません。'
          : required(action.payload.apiKey) ? null : 'API Keyが入力されていません。',

        userList: action.payload.userList[0] || action.payload.userList[0] === ''
          ? required(state.inputs.userList[0])   ? null : '通知をするユーザ名が入力されていません。'
          : required(action.payload.userList[0]) ? null : '通知をするユーザ名が入力されていません。'
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
        apiKey: null,
        userList: null
      }
  })

  return {state, dispatch}
}
