import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {IoMdAddCircleOutline} from 'react-icons/io'
import {MdDelete} from 'react-icons/md'
import {FiUpload} from 'react-icons/fi'
const AddTeamMembers = ({uploadHandler,teamMembers,setteamMembers,user}) => {


console.log(teamMembers)
const[formData,setFormData]  =useState([])

function changeHandler(event){
 setFormData(event.target.value)
 console.log(formData)
} 
async function addClickHandler(event){

  event.preventDefault()
  if(teamMembers.includes(formData)){
    toast.error('Email id is already entered')
  
  }
  else
 { 
 
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email:formData})
  };
  const response = await fetch('/api/v1/checkEmails', requestOptions);
  const data = await response.json();
  console.log(data)
  if(!data.success){
    toast.error('User is not registered')
  }
  else{
      setteamMembers(oldArray => [...oldArray, formData]) 
      toast.success('user added successfully')
      console.log('fomdata',teamMembers)}
}
}
function deleteClickHandler(teamMember){
  if(teamMember == user.email){
    toast.error('cannot delete you from team')
  }
  else
{  const newList = teamMembers.filter((member) => member!== teamMember);
  setteamMembers(newList); }
}



  return (
    <div className='flex flex-col gap-2'>
   
        <form className='flex flex-col gap-2'>
        <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[80%] p-[12px]' required type='email' value={formData } 
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
            />
           <button onClick={addClickHandler} className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
                        <div className="w-[18px] h-[18px] relative text-gray-900 text-xl" ><IoMdAddCircleOutline/></div>
                        <div className="text-center text-gray-900 text-base font-medium leading-normal">Add</div>
                  </button>
        </form>
        <div className='w-[70%]   '>
    <ul className='flex flex-col gap-2'>
    { teamMembers.map((member,index) => (
                    <li  key={index} className='flex rounded-[0.5rem] p-1 px-2 justify-between items-center  bg-gray-900'>
                        <div className="text-richblack-200 w-[80%] p-2 bg-richblack-800 my-2 rounded-[0.5rem] ">
                        {member}

                        </div>
                        <button onClick={()=>{deleteClickHandler(member)}} className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-center items-center gap-2 inline-flex">
                        <div className="w-[18px] h-[18px] relative text-gray-900 text-xl" ><MdDelete/></div>
                        <div className="text-center text-gray-900 text-base font-medium leading-normal">Delete</div>
                  </button>
                    </li>
                ))}
    </ul>
    <div className='flex px-2 justify-between mt-3'>
<div className='text-richblack-200 w-[80%] p-2  my-2 rounded-[0.5rem]'></div>
    <button onClick={uploadHandler}  className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-center items-center gap-2 inline-flex">
                        <div className="w-[18px] h-[18px] relative text-gray-900 text-xl" ><FiUpload/></div>
                        <div className="text-center text-gray-900 text-base font-medium leading-normal">Upload</div>
                  </button>
    </div>
    </div>
    </div>
  )
}

export default AddTeamMembers