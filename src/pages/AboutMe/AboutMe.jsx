import React, { useEffect, useState } from 'react'
import Form from '../../components/Form/Form'
import Back from '../../components/Back/Back'
import {handleClickValidation,post} from "../../store/Slice/AboutMeSlice"
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '../../store/Slice/AcyncSlice'

function AboutMe() {
  useEffect(()=>{
    localStorage.clear();
  },[])
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    let phone
    function setPhone(params) {
      
    }
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
        name: "surname", 
        placeholder: "Введите фамилию", 
        label: "Фамилия", 
        type: "text"
      },
      {
        id: 2, 
        state: phone, 
        set: setPhone,
        name: "phone", 
        placeholder: "+7 (333)-333-33-33", 
        label: "Телефон", 
        type: "tel"
      },
    ]
    //
    const bottomText = {
        bool: false,
      }   
    
  const dispatch = useDispatch()
  const data = useSelector(store => store.AboutMeSlice.singUp)
 async function onSubmit(){
    await dispatch(post())
    await dispatch(Auth([data.email,data.password]))
  }
  //  dispatch(check())
        return (
        <>
          <Back url={"/singup"}/>
          <Form 
            Inputs = {Inputs}
            arrState = {arrState}
            title={"Заполните данные о себе"}
            bottomText = {bottomText}
            handleClickValidation={handleClickValidation}
            onSubmit={onSubmit}
            />
        </>
        )
}

export default AboutMe
