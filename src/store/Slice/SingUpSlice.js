import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import styles from "../../components/Input/InputStyle/input.module.css"

// Запрос проверяет существование пользователя, вернет ошибку и почту.
// Запрос связан с input компонентом
export const fetchSingUp = createAsyncThunk(
  'SingUp/fetchSingUp',
  async function (value,name) {
    
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
    return [err,result]
  }
)

const SingUpSlice = createSlice({
    name:"SingUp",
    initialState:{
         classes: [styles.none,styles.none,styles.none],
         passState:"",
         error: true,
    },
    reducers:{
        // Меняем границы по клику фокуса
        //  Валидация по клику
        handleClickValidation(state, action) {
        const [pass,repeatPass] = action.payload
        // Валидация повтора пароля
        const newArr = [styles.none,styles.unsuccessfully,styles.unsuccessfully]
        if(pass === repeatPass && pass.length >= 8) newArr[2] = styles.successfully
        if(pass.length >= 8) newArr[1] = styles.successfully
        
        state.classes = [...newArr]
        state.passState = pass
        
        },
        error(state,action){
         state.error = action.payload.payload
        },
        errorStyle(state,action){
          state.classes = [styles.unsuccessfully,styles.successfully,styles.successfully]
        },
        // Создает стиль с ошибкой для email если почта совпадает с почтой в api
        emailError(state,action){
          state.error = action.payload
          if(state.error === true){
            state.classes[0] = styles.unsuccessfully
          }else{
            state.classes[0] = styles.successfully
          } 
        },
        // Сбрасывает стили
        defaultStyle(state,action){
          const arr = [styles.none,styles.none,styles.none]
          state.classes = [...arr]
        }
    }
})
export const {handleClickValidation,error,errorStyle,emailError,defaultStyle} = SingUpSlice.actions
export default SingUpSlice.reducer