import { configureStore } from "@reduxjs/toolkit";
import SingUpSlice from "./Slice/SingUpSlice"
import AboutMeSlice from "./Slice/AboutMeSlice"
export default configureStore({
    reducer:{
        SingUpSlice: SingUpSlice,
        AboutMeSlice: AboutMeSlice,
    }
})