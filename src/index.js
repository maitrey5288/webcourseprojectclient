import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import rootReducer from "./reducer";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer : rootReducer,
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>

    <App />
 <Toaster/>
  </BrowserRouter>
  </Provider>
    

);
