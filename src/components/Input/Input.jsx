import React, {  useState } from 'react'
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
        checkEmail: async (value) => {
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
        // Совпадают ли пароли
        passAndRepeatPass:(value)=> {
          if(name === "repeatPass"){
            return value === repeatPassValidate || 'Пароли не воспадают'
          }
        }
      },
    })} 
    value={state}
    onKeyDown={(e)=>keyBackspace = e.key }
    onChange = {(e)=> {
      setState(e.target.value)
      // Имя и фамилия с большой буквы
      if(name === "surname" || name === "name"){
         const first = e.target.value[0].toUpperCase()
         let word = e.target.value.split("")
         word[0] = first
         word = word.join("")
         setState(word)
      }
      if(name === "phone"){
        let phone = e.target.value.split("")
        if(keyBackspace !== "Backspace"){
          if(phone[0] === "7"||phone[0]==="+") {
            // if(phone.length < 3) phone[0] = `+${phone[0]} `
            if (phone.length > 2 && phone.length < 4)phone[2] = ` ${phone[2]}`
            if (phone.length > 6 && phone.length < 8)phone[6] = ` ${phone[6]}`
            if (phone.length > 10 && phone.length < 12)phone[10] = ` ${phone[10]}`
            if (phone.length > 13 && phone.length < 16)phone[13] = ` ${phone[13]}`
        }
      }
        if(keyBackspace === "Backspace"){
          if(phone[phone.length-1]===" " || phone[phone.length-1]==="+") phone.pop()
          if(phone[phone.length-2]==="+" && phone[phone.length-1]==="7") phone.length = 0
        }
        if(keyBackspace === " "){
          phone.pop()
        }
        let num
        const arr = ["1","2","3","4","5","6","7","8","9","0","+7"]
        if(phone.length >= 1){
          num = phone[phone.length - 1].replaceAll(" ","")
          if(!arr.includes(num)) phone.pop()
          if(arr.includes(num) &&
           phone.length <= 4 && 
           keyBackspace !== "Backspace") phone = ["+7 ",phone[0]]
        } 
        if(phone.length > 16) phone.pop()
        phone = phone.join("")
        setState(phone)
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
