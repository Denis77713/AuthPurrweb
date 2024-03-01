import React, { useState } from 'react'
import Form from '../../components/Form/Form'
import Back from '../../components/Back/Back'

function AboutMe() {
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [phone,setPhone] = useState("")
    // 
    const arrState = [name, surname, phone]
    const Inputs = [
      {
        id: 0, 
        state: name, 
        set: setName,
        name: "name", 
        placeholder:"Введите имя", 
        label: "Имя", 
        type: "text"
      },
      {
        id: 1, 
        state: surname, 
        set: setSurname, 
        name: "password", 
        placeholder: "Введите фамилию", 
        label: "Фамилия", 
        type: "text"
      },
      {
        id: 2, 
        state: phone, 
        set: setPhone,
        name: "repeatPass", 
        placeholder: "+7 (333)-333-33-33", 
        label: "Телефон", 
        type: "phone"
      },
    ]
    //
    const bottomText = {
        bool: false,
      }   
    
  
        return (
        <>
          <Back url={"/singup"}/>
          <Form 
            Inputs = {Inputs}
            arrState = {arrState}
            title={"Заполните данные о себе"}
            bottomText = {bottomText}
            />
        </>
        )
}

export default AboutMe
