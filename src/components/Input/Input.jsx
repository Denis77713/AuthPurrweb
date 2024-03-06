import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from "./InputStyle/input.module.css"
import labelStyle from "./LabelStyle/label.module.css"
import icnon from "./IconStyle/icnon.module.css"
import {ReactComponent as AcceptImg}  from './images/accept.svg'
import {ReactComponent as CloseImg}  from './images/close.svg'
import {emailError} from "../../store/Slice/SingUpSlice"

function Input({state, setState,register, name, num, placeholder, label, type}) {
  // Редюсер
  const classes = useSelector(store=>store.SingUpSlice.classes)
  //  Скрытие/отображение пароля
   const close = ["./images/eye_close.png","hidePassword"]
   const open = ["./images/eye_open.png","showPassword"]
   const [showAndHide,setShowAndHide] = useState(false)
  //  successfully/unsuccessfully
  const validateStyle = classes[num].replaceAll("_"," ").split(" ")[1]
  // 
  const dispatch = useDispatch()
   const repeatPassValidate = useSelector(store => store.SingUpSlice.passState)
   
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
      validate: {
        checkUrl: async (value) => {
          let result
          let err = false
          await fetch("http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com/users")
          .then(response=>response.json()).then(data=>{
            data.forEach(item=> {
              if(item.email === value){
                result = item.email
                err = true 
              }
            })
          })
          if(name === "email"){
           await dispatch(emailError(err))
            return value !== result || "Пользователь с таким email уже существует..."
          }
        },
        passAndRepeatPass:(value)=>{
          if(name === "repeatPass"){
            return value === repeatPassValidate || 'Пароли не воспадают'
          }
        }
      }
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
        <AcceptImg className = {icnon.accept} alt="accept"/>
        :validateStyle === "unsuccessfully"?
        <CloseImg className = {icnon.close}  alt="close"/>
        :""
      }
  </div>
      )
}

export default Input
