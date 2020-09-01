import React, { useEffect, useState, useRef } from 'react'
import styles from './Form.style.styl'

interface InputProps extends React.Props<{}> {
    className?: string,
    theme?: 'initialSetting',
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage?: string,
    errorFlag?: boolean,
    value: string, 
}

export const Input:React.FC<InputProps> = ({
    className,
    theme,
    placeholder,
    onChange,
    errorMessage,
    errorFlag,
    value,
}): JSX.Element => {
  const [initial, setInitial] = useState<boolean>(true)
  const didMountRef = useRef(false)

  useEffect(() => {
    if(didMountRef.current) {
      setInitial(false)
    } else {
      didMountRef.current = true
    }
  }, [value])

  return (
    <div className={`${className || ''}`}>
      <input
        data-testid='input'
        className={`${styles[theme]} ${
          initial && !value || errorMessage === undefined ? ''
          : errorMessage || errorFlag ? styles.validateError
          : styles.validateOk
          
        }`}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      { errorMessage !== undefined &&
        <p
          data-testid='errorMessage'
          className={styles.errorMessage}
        >{initial && !value ? '' : errorMessage}</p>
      }
    </div>
  )
}