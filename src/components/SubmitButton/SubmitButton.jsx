import React from 'react'

function SubmitButton({arrState,handleClickValidation}) {
  // Используется для проверки кнопки SubmitButton на disabled
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
   
  return <input onClick={handleClickValidation} type="submit" disabled = {disabletValue}  />
}

export default SubmitButton
