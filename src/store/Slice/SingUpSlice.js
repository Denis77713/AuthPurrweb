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
      if(item.email === dataFrom.email ||item.email === dataFrom) mail = true
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
         error: false
    },
    reducers:{
        // Меняем границы по клику фокуса
        //  Валидация по клику
        handleClickValidation(state, action) {
        const [pass,repeatPass,email] = action.payload
        // Валидация повтора пароля
        const newArr = []
        for(let i = 0; i <= action.payload.length; i++) {
        newArr.push(styles.unsuccessfully)
        }
        if(pass === repeatPass && pass.length >= 8) newArr[2] = styles.successfully
        if(pass.length >= 8) newArr[1] = styles.successfully
        if(email.length >= 8 && state.error === true) newArr[0] = styles.successfully    
        
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
          console.log(state.error)
          
        }
    }
})
export const {handleClickValidation,error,errorStyle,emailError} = SingUpSlice.actions
export default SingUpSlice.reducer