import { createSlice } from "@reduxjs/toolkit";
import styles from "../../components/Input/InputStyle/input.module.css"

const SingUpSlice = createSlice({
    name:"SingUp",
    initialState:{
         classes: [styles.none,styles.none,styles.none]
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
        if(email.length >= 8) newArr[0] = styles.successfully    
        
        state.classes = [...newArr]
        
        }  
    }
})
export const {handleClickValidation} = SingUpSlice.actions
export default SingUpSlice.reducer