import React, { useState } from 'react'
import Form from '../../components/Form/Form'

function SingIn() {
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    // 
    const arrState = [name, surname]
    const Inputs = [
      {
        id: 0, 
        state: name, 
        set: setName,
        name: "email", 
        placeholder:"example@mail.ru", 
        label: "Электронная почта", 
        type: "email"
      },
      {
        id: 1, 
        state: surname, 
        set: setSurname, 
        name: "password", 
        placeholder: "Введите 8 значный пароль", 
        label: "Пароль", 
        type: "password"
      }
    ]
    // 
    
    const bottomText = {
        bool: true,
        text: "Еще нет аккаунта?",
        href: "Зарегистрироваться",
        url:"/singup"
      }  
        return (
        <>
          <Form 
            Inputs = {Inputs}
            arrState = {arrState}
            title={"Авторизация"}
            bottomText = {bottomText}
            />
        </>
        )
}

export default SingIn
