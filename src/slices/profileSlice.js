import {createSlice} from "@reduxjs/toolkit"
   
   
 
 
const initialState = {
    user : null

}

const profileSlice = createSlice({
    name : "profile",
    initialState : initialState,
    reducers : {
        setUser(state,value){
            console.log(value,"value")
            state.user = value.payload;
        console.log("user changed",state.user)
        },
    },
});

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer ;