import React from 'react'

const styles = require('./SliderWrapper.style.styl')

type Props = {
  wrapperStyle?: any,
  step: number,
  length: number
}

export const SliderWrapper: React.FC<Props> = (props, {children}) => {

  const styleVar = {
    '--step'  : props.step,
    '--length': props.length
  }

  return (
    <div className={`${styles.wrapper} ${props.wrapperStyle}`} style={styleVar as React.CSSProperties}>
      {children}
    </div>
  )
}

SliderWrapper.defaultProps = {
  wrapperStyle: ''
}