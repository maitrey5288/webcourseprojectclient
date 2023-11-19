import React from 'react'
 
import loginImg from "../assets/frame.png"
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Template from '../components/LoginAndNavbar/Template'
const Login = () => {
  const {user} = useSelector( (state) => state.profile )
if(user){
  console.log("here",user)
  return <Navigate to='/'/>
}
  return (
    <Template
        title ='Welcome Back'
        desc1 ='Build skills for today, tommorrow, and beyond.'
        desc2 ='Eduction to future-proof your careen.'
        image={loginImg}
        formtype='login'
        

    />
  )
}

export default Login