import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import styles from "../../components/Input/InputStyle/input.module.css"

// Заменить!
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

const SingInSlice = createSlice({
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
        console.log(pass);
        console.log(repeatPass);
        }
    }
})
export const {handleClickValidation,error,errorStyle,emailError,defaultStyle} = SingInSlice.actions
export default SingInSlice.reducer