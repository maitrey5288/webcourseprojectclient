import React from 'react'
import { Navigate } from 'react-router-dom';
 
import { useSelector } from 'react-redux';

const Investor = ({isLoading,children}) => {
  console.log("inloding",isLoading)
  const {token} = useSelector( (state) => state.auth )
  const {user} = useSelector( (state) => state.profile )
  if(user && user.accountType == 'Investor'){
    console.log("hi")
    return children;
  }
  
  else{
    
    return <Navigate to='/'/>
  }
}

export default Investor