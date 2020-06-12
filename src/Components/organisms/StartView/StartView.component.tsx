import React from 'react'

// tslint:disable-next-line:no-any
const styles: any = require('./StartView.style.styl')

export const StartView:React.SFC = () => {
  // const wrapper = css`
  //   transition: all 0.7s ease 0.2s;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   height: calc(100vh - 25px);
  //   z-index: 100;
  //   width: 100vw;
  //   background: #42ce9f;
  // `

  // const title = css`
  //   color: #fff;
  //   font-size: clamp(22px, 7vw, 35px);
  //   font-weight: 700;
  //   line-height: 1.33;
  // `

  // const description = css`
  //   margin-top: clamp(10px, 5vw, 15px);
  //   color: #fff;
  //   font-size: clamp(12px, 4vw, 18px);
  //   font-weight: 400;
  //   line-height: 1.78;
  // `

  // const button = css`
  //   transition: 0.3s;
  //   position: relative;
  //   margin-top: clamp(20px, 8vw, 70px);
  //   padding: 9px 45px;
  //   color: #fff;
  //   background: transparent;
  //   border: 2px solid #fff;
  //   font-size: clamp(12px, 5vw, 24px);
  //   font-weight: 700;
  //   outline: none;
  //   &:hover {
  //     color: #42ce9f;
  //     cursor: pointer;
  //     &::after {
  //       width: 100%;
  //     }
  //   }
  //   &::after {
  //     transition: 0.3s;
  //     position: absolute;
  //     z-index: -1;
  //     top: 0;
  //     left: 0;
  //     content: '';
  //     display: block;
  //     width: 0;
  //     height: 100%;
  //     background: #fff;
  //   }
  // `
  
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Backlog Notification</h1>
      <p className={styles.description}>バックログのお知らせをpush通知します</p>
      <button className={styles.button}>設定して利用開始する</button>
    </div>
  )
}