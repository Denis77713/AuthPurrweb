import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import styles from "./SingUp.module.css"
function SingIn() {
  // Хранит стили
  const [classes,setClasses] = useState([styles.none,styles.none,styles.none])
  const [pass,setPass] = useState("")
  const [repeatPass,setRepeatPass] = useState("")
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
      } = useForm({
        mode:"onBlur"
      })      

      // В живом режиме отслеживает значение пароля
      const passwordValue = watch("password")
      const repeatPasswordValue = watch("repeatPassword")
      
      // Проверка перед ртправкой данных
      const onSubmit = (data) => {
        if(data.password === data.repeatPassword && data.password.length >= 8){
          console.log(data.password.length)
          
        }
        console.log(data)
      }

      // Меняем границы после снятия фокуса
      function getNewArrStyles(index) {
        if(pass.length >= 8 && pass === repeatPass){
          setClasses([...classes.slice(0, index),styles.successfully, ...classes.slice(index + 1)]) 
          
        }else{
          setClasses([...classes.slice(0, index),styles.unsuccessfully, ...classes.slice(index + 1)]) 
        }
      }
      
      // Проверка последнего поля при вводе
      function TheLastField(){
        if(passwordValue && pass === repeatPass){
          getNewArrStyles(0)
          console.log(classes)
        }
    }
    // TheLastField()
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Майл */}
          <input {...register("email", { required: true })} />
          {/* Пароль */}
          <input 
          {...register("password", {
            minLength:{
              value: 8,
              message:"Минимум 8 символов"
            }, 
            required: true,
          })}
          value={repeatPass}
          onChange={e=>setRepeatPass(e.target.value)} 
          />
          {/* Повтор пароля */}
          <input className = {classes[0]} 
          {...register("repeatPassword", { 
              required: true,
              validate: value => value === passwordValue || 'Пароли не воспадают',
              onBlur: (e) => getNewArrStyles(0),
            })} 
            value={pass}
            onChange = {(e)=> {setPass(e.target.value)}}/>
          {/* Всплывающая ошибка валидации */}
          {(errors.password && <span>{errors?.password?.message || 'Пароль обязателен'}</span>)}
          {(errors.repeatPassword && !errors.password && <span>{errors?.repeatPassword?.message || "Заполните поле"}</span>)}
          <input type="submit" disabled = {!isValid}  />
        </form>
      )
      
}

export default SingIn
