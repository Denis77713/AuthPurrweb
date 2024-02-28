import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Input from '../../components/Input/Input'
import SubmitButton from '../../components/SubmitButton/SubmitButton'
import {handleClickValidation} from "../../store/Slice/SingUpSlice"
import { useDispatch } from 'react-redux'
function SingIn() {
  // 
  const [pass,setPass] = useState("")
  const [repeatPass,setRepeatPass] = useState("")
  const [email,setEmail] = useState("")
  const dispatch = useDispatch()
  // 
  const arrState = [pass, repeatPass, email]
  const Inputs = [
    {id: 0, state: email, set: setEmail,name: "email", placeholder:"example@mail.ru", label: "Электронная почта", type: "email"},
    {id: 1, state: pass, set: setPass, name: "password", placeholder: "Введите пароль", label: "Пароль", type: "password"},
    {id: 2, state: repeatPass, set: setRepeatPass,name: "repeatPass", placeholder: "Повторите пароль", label: "Повтор пароля", type: "password"},
  ]
  
  // 
  // 
  // Хранит стили react-hook-form
 const {
    register,
    handleSubmit,
    formState: { 
      errors, 
    },
  } = useForm({mode:"onSubmit"})           
  // 
  // 
  // Проверка перед отправкой данных
      const onSubmit = () => {
          console.log(123)
      }
  //    
      return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          {/* Майл */}
          {Inputs.map(item=> 
          <Input
            key={item.id}
            state={item.state}
            setState={item.set}
            register={register}
            name={item.name}
            num={item.id}
            repeatPassValidate = {item.name === "repeatPass"? pass: ""}
            placeholder = {item.placeholder}
            label = {item.label}
            type = {item.type}
          />)}
          {/* Всплывающая ошибка валидации */}
          {(errors.password && <span>{errors?.password?.message || 'Пароль обязателен'}</span>)}
          {(errors.repeatPass && !errors.password && <span>{errors?.repeatPass?.message || "Заполните поле"}</span>)}
          <SubmitButton handleClickValidation={()=>dispatch(handleClickValidation(arrState))} arrState = {arrState}/>
        </form>
      )
      
}

export default SingIn
