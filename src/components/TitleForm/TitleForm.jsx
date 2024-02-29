import React from 'react'
import style from "./style/TitleForm.module.css"
function TitleForm({children}) {
  return (
    <h1 className={style.title}>{children}</h1>
  )
}

export default TitleForm
