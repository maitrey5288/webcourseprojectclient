import {createSlice} from "@reduxjs/toolkit"
 
 
const initialState = {
    category :false
}

const categorySlice = createSlice({
    name : "category",
    initialState : initialState,
    reducers : {
        setCategeory(state,value){
            state.category = value.payload;
        },
    },
});

export const {setCategeory} = categorySlice.actions;
export default categorySlice.reducer ;