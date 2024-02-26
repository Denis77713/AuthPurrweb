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
  const arrState = [pass, repeatPass,email]
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Майл */}
          <Input 
            state={email} 
            setState={setEmail} 
            register={register} 
            name={"email"}
            num = {0}
          />
          <Input 
            state={pass} 
            setState={setPass} 
            register={register} 
            name={"password"}
            num = {1}
          />
          <Input 
            state={repeatPass} 
            setState={setRepeatPass} 
            register={register} 
            name={"repeatPassword"}
            num = {2}
            // Для сравнения с полем пароля
            repeatPassValidate = {pass}
          />
          {/* Всплывающая ошибка валидации */}
          {(errors.password && <span>{errors?.password?.message || 'Пароль обязателен'}</span>)}
          {(errors.repeatPassword && !errors.password && <span>{errors?.repeatPassword?.message || "Заполните поле"}</span>)}
          <SubmitButton handleClickValidation={()=>dispatch(handleClickValidation(arrState))} arrState = {arrState}/>
        </form>
      )
      
}

export default SingIn
