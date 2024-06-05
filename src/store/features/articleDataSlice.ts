import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    articleData:[]
}
const articleSlice = createSlice({
    name:'article',
    initialState,

    reducers:{
        getArticleData:(state,{payload}) =>{
            state.articleData = payload
        }
    }
})
export const {getArticleData} = articleSlice.actions
export default articleSlice.reducer;
