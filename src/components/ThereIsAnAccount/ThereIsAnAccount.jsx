import React from 'react'
import style from './style/ThereIsAnAccount.module.css'
function ThereIsAnAccount({text, href}) {
  return (
  <div className={style.wrapperSing}>
    <span className={style.singText}>{text}</span>
    <span className={style.singHref}>{href}</span>
  </div>
  )
}

export default ThereIsAnAccount
