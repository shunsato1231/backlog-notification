import React from 'react'
import styles from './SliderWrapper.style.styl'

interface SliderWrapperProps extends React.Props<{}> {
  className?: any,
  step: number,
  length: number
}

export const SliderWrapper: React.FC<SliderWrapperProps> = ({
    className,
    step = 0,
    length = 0,
    children
  }) => {

  const styleVar = {
    '--step'  : step > 0 ? step - 1 : 0,
    '--length': length,
  }

  return (
    <div
      className={`${className || ''} ${styles.wrapper}`}
      style={styleVar as React.CSSProperties}
    >
      <div className={styles.slider}>
        {children}
      </div>
    </div>
  )
}