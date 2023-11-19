import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useParams } from 'react-router-dom';

const VerifyToken = () => {
const [loading,setIsLoading] = useState(true);
const params = useParams()
console.log("here")
async function submitHandler(){
     
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token:params.token})
    };
    const response = await fetch('/api/v1/confirmMail', requestOptions); 
    console.log(response)
    const data = await response.json();
    if(!data.success){
        toast.error(data.message);
    }
    else{
        toast.success('email verified successfully, Login to proceed')
    }
    setIsLoading(false)
}


if(loading)
{
     submitHandler()
     return (
     <div>Loading ... </div>
  )}
  else{

    return <Navigate to='/login'/>
  }
}

export default VerifyToken