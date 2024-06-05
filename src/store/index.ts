import {configureStore} from "@reduxjs/toolkit";
import articleDataSlice from "./features/articleDataSlice";
const store = configureStore({
    reducer:{
        article:articleDataSlice
    }
})
export default store