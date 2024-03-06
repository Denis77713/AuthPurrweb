import React, { Children } from 'react'
import style from "./TextError.module.css"
function TextError({children}) {
  return (
    <span className={style.error}>{children}</span>
  )
}

export default TextError
