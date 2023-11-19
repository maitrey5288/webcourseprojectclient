import React, { useState,useRef } from 'react'
import AddProjectDetails from './AddProjectDetails'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'

import './AddNewProject.css'
import AddTeamMembers from './AddTeamMembers'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
 const AddNewProject = () => {
  const navigate = useNavigate()
  const finaldata = new FormData();
  const {user} = useSelector( (state) => state.profile )
  const [teamMembers,setteamMembers] = useState([user.email]);
    const a ="stepper-item"
    const [stepNo,setStepNo] = useState(1)
    const [setSelectedOption] = useOutletContext()
    setSelectedOption('project')
    const [image,setImage] = useState(false)
    const[formData,setFormData]  =useState({name :'',type: "Software",description:"",thumbnail:"",})
 const [uploading ,setUploading] = useState(false)
    function changeHandler(event){
        const{name,value,checked,type} = event.target
        setFormData((prevData) =>(
            {
                ...prevData,
                
                   
                   [name]  : value
            }
        ) )
    }
    async function uploadHandler(event){
      setUploading(true)
      event.preventDefault();
      
     finaldata.append('thumbnail',image)
     finaldata.append('type',formData.type)
     finaldata.append('description',formData.description)
     finaldata.append('name',formData.name)
     finaldata.append('teamMembers',JSON.stringify(teamMembers))
     finaldata.append('categoryName',formData.category)
     console.log(formData)
     const response = await fetch('/api/v1/createproject', {
      method : 'POST',
      body : finaldata
     });
     const data = await response.json();
     console.log(data,"projectdata")
     
     setUploading(false)
     toast.dismiss()
     toast.success("Project Created Successfully")
     navigate('/dashboard/project')
    }
            

  
if(uploading ){

  
  return toast.loading('Creating Project')

}  
else{
  
    return (
    <div className='p-6 w-full'>
        <div className='mx-auto'>
        <div className='stepper-wrapper'>
      <div className={a+((stepNo >1) ? (' completed') : (stepNo ==1 ? (' active'): ('')))}>
        <div className="step-counter">1</div>
        <div className="step-name text-richblack-200">Project Details</div>
      </div>
      <div className={a+((stepNo >2) ? (' completed') : ((stepNo ==2 ?(' active'):(''))))}>
        <div className="step-counter">2</div>
        <div className="step-name text-richblack-200">Upload</div>
      </div>
   
      
    </div>
             
           
        </div>

        {
            stepNo == 1 ? (<AddProjectDetails image={image} setImage={setImage} formData={formData} setFormData={setFormData} changeHandler={changeHandler} setStepNo={setStepNo}/>) : (<><button className='text-white' onClick={()=>{setStepNo(1)}}>back</button><AddTeamMembers teamMembers={teamMembers} user={user} setteamMembers={setteamMembers} uploadHandler={uploadHandler}/></>)
        }
     
    </div>
  )
      }
}

export default AddNewProject