import React from 'react'
import { Navigate } from 'react-router-dom';
 
import { useSelector } from 'react-redux';

const PrivateRoute = ({isLoading,children}) => {
  console.log("inloding",isLoading)
  const {token} = useSelector( (state) => state.auth )
  const {user} = useSelector( (state) => state.profile )
  if(user){
    console.log("hi")
    return children;
  }
  
  else{
    
    return <Navigate to='/'/>
  }
}

export default PrivateRoute