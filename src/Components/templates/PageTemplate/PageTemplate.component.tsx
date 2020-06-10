import React from 'react'
import {css} from '@emotion/core'

export const PageTemplate: React.SFC = ({children}) => {
  const wrapper = css`
    background: #ECECEC;
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding: 0 auto 24px;
    overflow: hidden; /* marginが突き抜けるのを回避 */
    &:before: { /* marginの相殺回避 */
      display block
      content ''
    }
  `
  const footer = css`
    width: 100%;
    height: 25px;
    background: #41B289;
    position: absolute;
    bottom: 0;
    small {
      display: block;
      margin: 0 auto;
      width: 90%;
      max-width: 1200px;
      font-size: 12px;
      line-height: 25px;
      color: #fff
    }
  `
  return (
    <div css={wrapper}>
      { children }
      <footer css={footer}>
        <small>© 2020 Shun Sato</small>
      </footer>
    </div>
  )
}