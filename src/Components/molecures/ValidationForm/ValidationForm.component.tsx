import React, { useEffect, useState, useRef } from 'react'
import styles from './ValidationForm.style.styl'
import { Input } from '../../atoms/Input/Input.component'

interface ValidationFormProps extends React.Props<{}> {
    className?: string,
    theme?: 'initialSetting',
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage?: string,
    errorFlag?: boolean,
    value: string, 
}

export const ValidationForm:React.FC<ValidationFormProps> = ({
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
      <Input
        data-testid='input'
        className={styles.input}
        theme={theme}
        status={initial && !value || errorMessage === undefined ? 'normal'
        : errorMessage || errorFlag ? 'error'
        : 'correct'}
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