import { configureStore } from "@reduxjs/toolkit";
import SingUpSlice from "./Slice/SingUpSlice"
export default configureStore({
    reducer:{
        SingUpSlice: SingUpSlice
    }
})