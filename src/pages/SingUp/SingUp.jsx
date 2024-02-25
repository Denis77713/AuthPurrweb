import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Input from '../../components/Input/Input'
import styles from "./SingUp.module.css"
import SubmitButton from '../../components/SubmitButton/SubmitButton'

function SingIn() {
  const [pass,setPass] = useState("")
  const [repeatPass,setRepeatPass] = useState("")
  const [email,setEmail] = useState("")
  const [classes,setClasses] = useState([styles.none,styles.none,styles.none])
  const arrState = [pass, repeatPass,email]
  // Хранит стили
 const {
    register,
    handleSubmit,
    formState: { 
      errors, 
    },
  } = useForm({mode:"onSubmit"})         
      // Проверка перед отправкой данных
      const onSubmit = () => {
          console.log(123)
      }
      // Меняем границы после снятия фокуса
      //  Валидация по клику
      function handleClickValidation(arr) {
        // Валидация повтора пароля
        const newArr = []
        for(let i = 0; i <= arr.length -1; i++) {
          newArr.push(styles.unsuccessfully)
        }
        if(pass === repeatPass && pass.length >= 8) newArr[2] = styles.successfully
        if(pass.length >= 8 && !errors.pass) newArr[1] = styles.successfully
        if(email.length >= 8) newArr[0] = styles.successfully
        
        setClasses([...newArr])
      }  
      // Используется для проверки кнопки SubmitButton на disabled
      function checkDisabledSubmit(arr) {
        const result = []
        let res
        arr.forEach(item=>{
          if(item === ""){
            result.push(false)
          }else{
            result.push(true)
          }
        })
        result.forEach(i=>{
          if(i===true){
            res = true
          }
        })
        res === undefined?res = true:res = false
        return res          
      }
       const disabletValue = checkDisabledSubmit(arrState) 
       
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Майл */}
          <Input 
            state={email} 
            setState={setEmail} 
            classes={classes} 
            register={register} 
            name={"email"}
            num = {0}
          />
          <Input 
            state={pass} 
            setState={setPass} 
            classes={classes} 
            register={register} 
            name={"password"}
            num = {1}
          />
          <Input 
            state={repeatPass} 
            setState={setRepeatPass} 
            classes={classes} 
            register={register} 
            name={"repeatPassword"}
            num = {2}
          />
          {/* Всплывающая ошибка валидации */}
          {(errors.password && <span>{errors?.password?.message || 'Пароль обязателен'}</span>)}
          {(errors.repeatPassword && !errors.password && <span>{errors?.repeatPassword?.message || "Заполните поле"}</span>)}
          <SubmitButton handleClickValidation={()=>handleClickValidation(arrState)} disabletValue = {disabletValue}/>
        </form>
      )
      
}

export default SingIn
