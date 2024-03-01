import React from 'react'
import style from './style/ThereIsAnAccount.module.css'
import { useNavigate } from 'react-router-dom'
function ThereIsAnAccount({text, href,url}) {

  const navigate = useNavigate()

function redirect (url){
  navigate(url)
}

  return (
  <div className={style.wrapperSing}>
    <span className={style.singText}>{text}</span>
    <span className={style.singHref} onClick={()=>redirect(url)}>{href}</span>
  </div>
  )
}

export default ThereIsAnAccount
