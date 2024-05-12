import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from "./InputStyle/input.module.css"
import labelStyle from "./LabelStyle/label.module.css"
import icnon from "./IconStyle/icnon.module.css"
import {ReactComponent as AcceptImg}  from './images/accept.svg'
import {ReactComponent as CloseImg}  from './images/close.svg'
import {emailError,fetchSingUp} from "../../store/Slice/SingUpSlice"
import {phoneValidation,nameAndSurname} from "../../store/Slice/AboutMeSlice"
import { useLocation } from 'react-router-dom'
import { emailErrorSingIn,fetchSingIn } from '../../store/Slice/SingInSlice'

function Input({state, setState,register, name, num, placeholder, label, type}) {
  //  На какой странице мы находимся, useLocation это определяет 
  const location = useLocation()
  // Вытаскиваем массив со стилями инпута из хранилища
  const SingUpSlice = useSelector(store=>store.SingUpSlice.classes)
  const AboutMeSlice = useSelector(store=>store.AboutMeSlice.classes)
  const SingInSlice = useSelector(store=>store.SingInSlice.classes)
  let classes
  // В зависимости на какой мы странице, применяется логика стилей
  if(location.pathname === "/singup") {
    classes = SingUpSlice
    console.log(classes);
  }else if(location.pathname === "/aboutme"){
    classes = AboutMeSlice
  }else if(location.pathname === "/singin") {
    classes = SingInSlice
  } 
  else {
    // Заглушка, если не прописанна логика для стилей
    classes = ["input_none__58uhS","input_none__58uhS","input_none__58uhS"]

  }
  

  //  Скрытие/отображение пароля
   const close = ["./images/eye_close.png","hidePassword"]
   const open = ["./images/eye_open.png","showPassword"]
   const [showAndHide,setShowAndHide] = useState(false)
  //  successfully/unsuccessfully
  const validateStyle = classes[num].replaceAll("_"," ").split(" ")[1]
  // 
  const dispatch = useDispatch()
   const repeatPassValidate = useSelector(store => store.SingUpSlice.passState)
   let keyBackspace
  
  return (
  <div className={style.wrapperSingUp}>
    <label className={labelStyle.labelSingUp}>{label}</label>
    <input 
    type={!showAndHide? type:""}
    className = {`${style.inputSingUp} ${classes[num]}`} 
    placeholder={placeholder}
    {...register(name, { 
      minLength:{
        value: name === "repeatPass" ? 8 
        : name === "password" ? 8 
        : 1,
        message:"Минимум 8 символов"
      }, 
      required: true,
      validate: {
        // Запрос на сервер. Совпадает ли поле значение поля email с email в api
        // value это поле почты
        checkEmail: async (value) => {
          //  fetchSingUp ищет совпадает ли value с почтами в api
          const reqestSingUp = await dispatch(fetchSingUp(value))
          const reqestSingIn = await dispatch(fetchSingIn(value))
          let data
          if(location.pathname === "/singup") data = reqestSingUp
          if(location.pathname === "/singin") data = reqestSingIn
          
          console.log(data);
          // Если совпало то err = true
           let err = await data.payload[0]
          //  result тут сама почта
           let result = await data.payload[1]
          // Логика для singup
           if(name === "email" && location.pathname ==="/singup"){
             await dispatch(emailError(err))
             return value !== result || "Пользователь с таким email уже существует..."
            }
            // Логика для singin
            if(name === "email" && location.pathname ==="/singin"){
              await dispatch(emailErrorSingIn(err))
             return value === result || "Такого пользователя не существует"
           }
        },
        // Совпадают ли пароли
        passAndRepeatPass:(value)=> {
          if(name === "repeatPass"){
            return value === repeatPassValidate || 'Пароли не воспадают'
          }
        },
        phoneValidate:(value)=> {
          if(name === "phone"){
            console.log(value)
            return value.length === 16 || 'Не верный формат номера телефона'
            
          }
        },
      },
    })} 
    value={state}
    onKeyDown={(e)=>keyBackspace = e.key }
    onChange = {(e)=> {
      setState(e.target.value)
      // Имя и фамилия с большой буквы
      if(name === "surname" || name === "name"){
        const dataWord = dispatch(nameAndSurname(e.target.value))
         setState(dataWord.payload)
      }
      if(name === "phone") {
        dispatch(phoneValidation([e.target.value, keyBackspace]))
        console.log(state)
        
        
      }
      
      }}/>
    {/* Только для пароля */}
    {
      type === "password"||""?
        <img className={validateStyle === "successfully" || validateStyle === "unsuccessfully" ? icnon.eyeActive : icnon.eye} 
        src={!showAndHide ? close[0] : open[0]} 
        alt = {!showAndHide ? close[1] : open[1]} 
        onClick={()=>setShowAndHide(!showAndHide)}
        />  
      :""
    }
    
      {
        validateStyle === "successfully"
        ? 
        <AcceptImg className = {icnon.accept} alt="accept"/>
        :validateStyle === "unsuccessfully"?
        <CloseImg className = {icnon.close}  alt="close"/>
        :""
      }
  </div>
      )
}

export default Input
