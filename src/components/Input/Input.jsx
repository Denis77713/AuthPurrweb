import React from 'react'
import { useSelector } from 'react-redux'

function Input({state, setState,register, name,num,repeatPassValidate}) {
   const classes = useSelector(store=>store.SingUpSlice.classes)
   
  return (
    <input 
    className = {classes[num]} 
    {...register(name, { 
      minLength:{
        value: 8,
        message:"Минимум 8 символов"
      }, 
        required: true,
        validate: value => name === "repeatPassword"? value === repeatPassValidate: true|| 'Пароли не воспадают',
      })} 
      value={state}
      onChange = {(e)=> {setState(e.target.value)}}/>  
      )
}

export default Input
