import React from 'react'
import TitleForm from '../TitleForm/TitleForm'
import { useForm } from 'react-hook-form'
import Input from '../Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton'
import ThereIsAnAccount from '../ThereIsAnAccount/ThereIsAnAccount'
import { useDispatch } from 'react-redux'
import {handleClickValidation} from "../../store/Slice/SingUpSlice"



function Form({Inputs,arrState,title,bottomText, pass}) {
  const dispatch = useDispatch()
    // Хранит стили react-hook-form
const {
    register,
    handleSubmit,
    formState: { 
      errors, 
    },
  } = useForm({mode:"onSubmit"})           
  // 
  // 
  // Проверка перед отправкой данных
      const onSubmit = () => {
          console.log(123)
      }
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <TitleForm>{title}</TitleForm>
    {/* Майл */}
    {Inputs.map(item=> 
    <Input
      key={item.id}
      state={item.state}
      setState={item.set}
      register={register}
      name={item.name}
      num={item.id}
      repeatPassValidate = {item.name === "repeatPass"? pass: ""}
      placeholder = {item.placeholder}
      label = {item.label}
      type = {item.type}
    />)}
    {/* Всплывающая ошибка валидации */}
    {(errors.password && <span>{errors?.password?.message || 'Пароль обязателен'}</span>)}
    {(errors.repeatPass && !errors.password && <span>{errors?.repeatPass?.message || "Заполните поле"}</span>)}
    
    <SubmitButton handleClickValidation={()=>dispatch(handleClickValidation(arrState))}
     arrState = {arrState}/>
    {/* ThereIsAnAccount */}
    {bottomText?
        <ThereIsAnAccount
        text={"Уже есть аккаунт?"}
        href={"Войти"}
        />
        :""
    }
  </form>
  )
}

export default Form
