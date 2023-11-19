import {combineReducers} from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice"
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";
import categorySlice from "../slices/categorySlice";


const rootReducer = combineReducers({
    auth : authSlice,
    profile : profileSlice,
    cart : cartSlice,
    category : categorySlice
})

export default rootReducer