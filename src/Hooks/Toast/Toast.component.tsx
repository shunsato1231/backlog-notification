import React from 'react'
import { useToastContext } from './Toast.context'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styles from './Toast.style.styl'

export const Toast: React.FC = (): JSX.Element => {
  const toast = useToastContext()

  const dismiss = (index: number) => {
    toast.dispatch({
      type: 'POP_NOTIFICATION',
      payload: {
        index: index
      }
    })
  }

  return (
    <TransitionGroup
      component="ul"
      className={styles.wrapper}
    >
      {toast.state.notifications.map(( value, index ) => (
        <CSSTransition
          key={index}
          timeout={400}
          unmountOnExit={true}
          classNames={{
            enter: styles.toastEnter,
            enterDone: styles.toastEnterDone,
            exit: styles.toastExit,
            exitActive: styles.toastExitActive,
          }}
        >
          <li
            data-testid='toast'
            onClick={() => dismiss(index)}
            className={styles.toast}
          >
            {value}
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
