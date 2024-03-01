import React, { useState } from 'react'
import Form from '../../components/Form/Form'
function SingIn() {
  // 
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
  // 
  
  //    
      return (
        <Form 
          Inputs = {Inputs}
          arrState = {arrState}
          title={"Регистрация"}
          bottomText = {bottomText}
        />
      )
      
}

export default SingIn
