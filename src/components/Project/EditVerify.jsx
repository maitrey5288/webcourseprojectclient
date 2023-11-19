import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EditProject from './EditProject'

const EditVerify = () => {
    const navigate = useNavigate()
  const params = useParams()
  const {token} = useSelector( (state) => state.auth )
  
    const [loading,setIsLoading] = useState(true);
const[project,setProject] = useState(false)
  async function getProjectDetails(){
    console.log("inside")
     
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token :token,projectId:params.projectId})
    };
    const response = await fetch('/api/v1/getProjectDetailsByID', requestOptions);
    const data = await response.json();
    toast.dismiss();
    console.log(data.project)
    if(!data.success){
        
        
        toast.error(data.message)
        navigate('/')
        console.log("kk")
    }
    console.log(data.project)
    setProject(data.project)
    setIsLoading(false)
    console.log(project)
 
  
}

if(loading){
    toast.loading("fetching data");
    getProjectDetails()
    return<></>
}
else{  
return (
    <EditProject project={project}/> 
)
}
}
export default EditVerify