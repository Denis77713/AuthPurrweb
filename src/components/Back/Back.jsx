import React from 'react'
import style from './style/Back.module.css'
import { useNavigate } from 'react-router-dom'
function Back({url}) {
    const navigate = useNavigate()

    function redirectBack(url){
        navigate(url)
    }
    return (
    <div onClick={()=>redirectBack(url)} className={style.back}>
        <img className={style.back__img} src="./images/back.svg " alt="" />
        <span className={style.back__text}>Назад</span>
    </div>
  )
}

export default Back
