import React from 'react'
import signupImg from '../assets/frame.png'
import Template from '../components/LoginAndNavbar/Template'
import { Navigate } from 'react-router-dom'
const Signup = ({setUser,user}) => {
   if(user){
      <Navigate to='/'/>
    }
   return (
    <Template
    title ='Join the millions learning to code with studynotion for free'
    desc1 ='Build skills for today, tommorrow, and beyond.'
    desc2 ='Eduction to future-proof your career.'
    image={signupImg}
    formtype='signup'
    user={user}

/>
   )
}

export default Signup