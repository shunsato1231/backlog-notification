import { useReducer } from 'react'

interface Action<type, payload = {}> {
  type: type,
  payload?: payload,
}

type pushNotification = Action<'PUSH_NOTIFICATION', {message: string}>
type popNotification = Action<'POP_NOTIFICATION', {index: number}>

type Actions = pushNotification | popNotification

interface State {
  notifications: string[]
}

const reducer = (state: State, action: Actions): State => {
  switch(action.type) {
    case 'PUSH_NOTIFICATION': {
      let newNotifications = state.notifications
      newNotifications.push(action.payload.message)
      return {
        notifications: newNotifications
      }
    }
    case 'POP_NOTIFICATION': {
      let newNotifications = state.notifications
      newNotifications.splice(action.payload.index, 1)
      return {
        notifications: newNotifications
      }
    }
  }
}

export interface ToastContextType {
  state: State,
  dispatch: React.Dispatch<Actions>
}

export const useToast = (): ToastContextType => {
  const [state, dispatch] = useReducer(reducer,{
    notifications: []
  })

return {state, dispatch}
}