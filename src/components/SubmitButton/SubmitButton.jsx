import React from 'react'
import style from "./SubmitButton.module.css"
function SubmitButton({arrState,handleClickValidation}) {
  // Используется для проверки кнопки submitButtonSingUP на disabled
  function checkDisabledSubmit(arr) {
    const result = []
    let res
    arr.forEach(item=>{
      if(item === ""){
        result.push(false)
      }else{
        result.push(true)
      }
    })
    result.forEach(i=>{
      if(i===true){
        res = true
      }
    })
    res === undefined?res = true:res = false
    return res          
  }

   const disabletValue = checkDisabledSubmit(arrState) 
   const active = style.submitButtonSingUP + " " + style.active
   const disabled = style.submitButtonSingUP + " " + style.disabled

  return <input 
  value={"Продолжить"}
  className = {disabletValue ? disabled : active}
  onClick={handleClickValidation} 
  type="submit" 
  disabled = {disabletValue}  />
}

export default SubmitButton
