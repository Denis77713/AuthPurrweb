import React from 'react'

function Input({state, setState, classes,register, name,num}) {
   
  return (
    <input className = {classes[num]} 
    {...register(name, { 
      minLength:{
        value: 8,
        message:"Минимум 8 символов"
      }, 
        required: true,
        validate: value => value === state || 'Пароли не воспадают',
      })} 
      value={state}
      onChange = {(e)=> {setState(e.target.value)}}/>  
      )
}

export default Input
