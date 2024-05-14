import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import styles from "../../components/Input/InputStyle/input.module.css"

// Запрос проверяет существование пользователя
export const fetchSingIn = createAsyncThunk(
  'SingIn/fetchSingIn',
  async function (value) {
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

const SingInSlice = createSlice({
    name:"SingUp",
    initialState:{
         classes: [styles.none,styles.none],
         passState:"",
         error: true,
    },
    reducers:{
        // Меняем границы по клику фокуса
        //  Валидация по клику
        handleClickValidation(state, action) {
        const [pass,repeatPass] = action.payload
        },
        emailErrorSingIn(state,action){
          if(action.payload === true){
            state.classes[0] = styles.successfully
          }else{
            state.classes[0] = styles.unsuccessfully
          }
        }
    }
})
export const {handleClickValidation,error,errorStyle,emailErrorSingIn,defaultStyle} = SingInSlice.actions
export default SingInSlice.reducer