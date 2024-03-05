import React, { useState } from 'react'
import Form from '../../components/Form/Form'
import {handleClickValidation,fetchSingUp} from "../../store/Slice/SingUpSlice"
import { useNavigate } from 'react-router-dom'
import { error } from '../../store/Slice/SingUpSlice'
import { useDispatch } from 'react-redux'

function SingIn() {
  // 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 
//  async function onSubmit (dataFrom) {
//     let response
//     const URL = "http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com/users";
//     await fetch(URL)
//       .then((response) => response.json())
//       .then(data =>
//         data.forEach(item => {if(item.email === dataFrom.email) response = true})
//       )

//         if(!response){
//           dispatch(error(false))
//           navigate("/aboutme")
//         }else{
//           dispatch(error(true))
//         }
//     }
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
  function onSubmit(data){
    const response = dispatch(fetchSingUp(data))
    response.then(request=>request).then(data=>{ 
      console.log(data)
      dispatch(error(data))
    })
  }
  function onError(data){
    console.log(data)
  }
  //    
      return (
        <Form 
          Inputs = {Inputs}
          arrState = {arrState}
          title={"Регистрация"}
          bottomText = {bottomText}
          handleClickValidation={handleClickValidation}
          onSubmit={onSubmit}
          onError={onError}
        />
      )
      
}

export default SingIn
