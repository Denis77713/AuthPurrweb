import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import styles from "../../components/Input/InputStyle/input.module.css"

export const fetchSingUp = createAsyncThunk(
  'SingUp/fetchSingUp',
  async function(dataFrom){
    let mail
    const URL = "http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com/users";
    await  fetch(URL)
    .then((response) => response.json())
    .then(data =>
    data.forEach(item => {
      if(item.email === dataFrom.email || item.email === dataFrom) mail = true
      console.log(mail)
    }))
    return mail
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
        const [pass,repeatPass,email] = action.payload
        // Валидация повтора пароля
        const newArr = [styles.none,styles.unsuccessfully,styles.unsuccessfully]
        if(pass === repeatPass && pass.length >= 8) newArr[2] = styles.successfully
        if(pass.length >= 8) newArr[1] = styles.successfully
        // if(email.length >= 8 && state.error === false) newArr[0] = styles.successfully    
        console.log(state.error)
        
        state.classes = [...newArr]
        state.passState = pass
        console.log(123)
        
        },
        error(state,action){
         state.error = action.payload.payload
        },
        errorStyle(state,action){
          state.classes = [styles.unsuccessfully,styles.successfully,styles.successfully]
        },
        emailError(state,action){
          state.error = action.payload
          if(state.error ===true){
            console.log(state.error)
            state.classes[0] = styles.unsuccessfully
          }else{
            state.classes[0] = styles.successfully
          } 
        },
        defaultStyle(state,action){
          const arr = [styles.none,styles.none,styles.none]
          state.classes = [...arr]
        }
    }
})
export const {handleClickValidation,error,errorStyle,emailError,defaultStyle} = SingUpSlice.actions
export default SingUpSlice.reducer