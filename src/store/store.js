import { configureStore } from "@reduxjs/toolkit";
import SingUpSlice from "./Slice/SingUpSlice"
import SingInSlice from "./Slice/SingInSlice"
import AboutMeSlice from "./Slice/AboutMeSlice"
export default configureStore({
    reducer:{
        SingUpSlice: SingUpSlice,
        SingInSlice: SingInSlice,
        AboutMeSlice: AboutMeSlice,
    }
})