import React from 'react'
import TitleForm from '../TitleForm/TitleForm'
import { useForm } from 'react-hook-form'
import Input from '../Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton'
import ThereIsAnAccount from '../ThereIsAnAccount/ThereIsAnAccount'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'



function Form({Inputs,arrState,title,bottomText,handleClickValidation,onSubmit,onError}) {
  const navigate = useNavigate()
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
 
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit,onError)}>
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
    {bottomText.bool?
        <ThereIsAnAccount
        text={bottomText.text}
        href={bottomText.href}
        url={bottomText.url}
        />
        :""
    }
  </form>
  )
}

export default Form
