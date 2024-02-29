import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import style from "./InputStyle/input.module.css"
import labelStyle from "./LabelStyle/label.module.css"
import icnon from "./IconStyle/icnon.module.css"
import {ReactComponent as AcceptImg}  from './images/accept.svg'
import {ReactComponent as CloseImg}  from './images/close.svg'

function Input({state, setState,register, name, num, repeatPassValidate, placeholder, label, type}) {
  // Редюсер
  const classes = useSelector(store=>store.SingUpSlice.classes)
  //  Скрытие/отображение пароля
   const close = ["./images/eye_close.png","hidePassword"]
   const open = ["./images/eye_open.png","showPassword"]
   const [showAndHide,setShowAndHide] = useState(false)
  //  successfully/unsuccessfully
  const validateStyle = classes[num].replaceAll("_"," ").split(" ")[1]
  // 
   
  return (
  <div className={style.wrapperSingUp}>
    <label className={labelStyle.labelSingUp}>{label}</label>
    <input 
    type={!showAndHide? type:""}
    className = {`${style.inputSingUp} ${classes[num]}`} 
    placeholder={placeholder}
    {...register(name, { 
      minLength:{
        value: 8,
        message:"Минимум 8 символов"
      }, 
      required: true,
      validate: value => name === "repeatPass"? value === repeatPassValidate: true || 'Пароли не воспадают',
    })} 
    value={state}
    onChange = {(e)=> {setState(e.target.value)}}/>
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
        // <img className = {icnon.accept} src={} alt="accept" />
        <AcceptImg className = {icnon.accept} alt="accept"/>
        :validateStyle === "unsuccessfully"?
        // <img className = {icnon.close} src="./images/close.svg" alt="close" />
        <CloseImg className = {icnon.close}  alt="close"/>
        :""
      }
  </div>
      )
}

export default Input
