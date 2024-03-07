import { createSlice } from "@reduxjs/toolkit";
const AboutMeSlice = createSlice({
    name:"AboutMe",
    initialState:{
         singUp:{}
    },
    reducers:{
        handleClickValidation(){},
        dataInAboutMe(state,actions){
            state.singUp = {...actions.payload}
            console.log(state.singUp)
        }
    }
})
export const {handleClickValidation,dataInAboutMe} = AboutMeSlice.actions
export default AboutMeSlice.reducer