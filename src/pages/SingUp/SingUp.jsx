import React, { useEffect, useState } from 'react'
import Form from '../../components/Form/Form'
import {handleClickValidation,defaultStyle} from "../../store/Slice/SingUpSlice"
import {check, dataInAboutMe} from "../../store/Slice/AboutMeSlice"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
function SingIn() {
  // 
  useEffect(()=>{
    localStorage.clear();
  },[])
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const [pass,setPass] = useState("")
  const [repeatPass,setRepeatPass] = useState("")
  const [email,setEmail] = useState("")
  // 
  const arrState = [pass, repeatPass, email]
  const Inputs = [
    {
      id: 0, 
      state: email, 
      set: setEmail,
      name: "email", 
      placeholder:"example@mail.ru", 
      label: "Электронная почта", 
      type: "email"
    },
    {
      id: 1, 
      state: pass, 
      set: setPass, 
      name: "password", 
      placeholder: "Введите пароль", 
      label: "Пароль", 
      type: "password"
    },
    {
      id: 2, 
      state: repeatPass, 
      set: setRepeatPass,
      name: "repeatPass", 
      placeholder: "Повторите пароль", 
      label: "Повтор пароля", 
      type: "password"
    },
  ]
  const bottomText = {
    bool: true,
    text: "Уже есть аккаунт?",
    href: "Войти",
    url:"/singin"
  }  
  function onSubmit(data){
    dispatch(dataInAboutMe(data))
    navigate("/aboutme")
    dispatch(defaultStyle())
    dispatch(check(data))
  }
      return (
        <Form 
          Inputs = {Inputs}
          arrState = {arrState}
          title={"Регистрация"}
          bottomText = {bottomText}
          handleClickValidation={handleClickValidation}
          onSubmit={onSubmit}
        />
      )
      
}

export default SingIn
