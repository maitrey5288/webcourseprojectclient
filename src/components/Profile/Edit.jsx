import React, { useState } from 'react'
import { Link, matchPath, useLocation, useOutletContext } from 'react-router-dom'
import {BiEditAlt} from 'react-icons/bi'
import { useSelector } from 'react-redux'
const Edit = ( ) => {

  const [setSelectedOption] = useOutletContext()
  setSelectedOption('profile')
  const location = useLocation();
  console.log(location.pathname)
  const {user} = useSelector( (state) => state.profile )
  const[formData,setFormData]  =useState({dateOfBirth:user.profile.dateOfBirth,contactNumber:user.profile.contactNumber,about:user.profile.about,gender:user.profile.gender})
 
  function changeHandler(event){
    const{name,value,checked,type} = event.target
    setFormData((prevData) =>(
        {
            ...prevData,
            
               
               [name]  : value
        }
    ) )
}
 
 
 
 
  return (
    <div className='text-white w-[80%]'>
    <div>
     <div className='flex justify-between items-center p-6 w-[60%]   ml-[10%] mt-10 rounded-md bg-gray-900'>
   <div className='flex items-center gap-4'>
   <img className='w-14 h-14 rounded-full' src={user.profile.profilePicture}/> 
  <div>
    <div className="w-full text-indigo-50 text-lg font-semibold leading-relaxed">Change Profile Picture</div>
     <div className='flex gap-3'>
    <Link to='/dashboard/profile/edit'>
   <button className="  h-8 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
 

<div className="text-center text-gray-900 text-base font-medium leading-normal">Change</div>
</button>
</Link>
    <Link to='/dashboard/profile/edit'>
   <button className="  h-8 px-5 py-2 bg-slate-800 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
 

<div className="text-center text-gray-300 text-base font-medium leading-normal">Remove</div>
</button>
</Link>
</div>
    </div>
    </div> 
  
   </div>

    <div className='flex flex-col     p-6 w-[60%]   ml-[10%] mt-10 rounded-md bg-gray-900'>
          <div className='text-indigo-50 text-lg font-semibold   leading-relaxed'>Profile Information</div>
          <div className='flex justify-between'>
              <div className='w-[40%]'>

                
                <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Date of Birth
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='date' value={formData.dateOfBirth} 
                onChange={changeHandler}
                placeholder='Enter project title'
                name='dateOfBirth'
            />
         </label>  
              </div>
              <div className='text-white w-[50%]'>

              <fieldset className=''>
            <legend className='m-2'>
                Gender  :

            </legend>
            <div className='bg-richblack-800  rounded-lg p-3 flex  gap-20'>

            

           <div className='flex gap-1'>
            <input  className='accent-yellow-50'
            type ="radio"
            onChange={changeHandler}
            name="type"
            value="Male"
            id="Offline-Mode"
            checked={formData.type ==="Male"}
            >
            </input>
            <label className={formData.type ==="Male"?('text-yellow-50'):''}  htmlFor="Offline-Mode"> Male</label>
</div>
<div className='flex gap-1'>
            <input className='accent-yellow-50'
            type ="radio"
            onChange={changeHandler}
            name="type"
            value="Female"
            id="Online-Mode"
            checked={formData.type ==="Female"}
            >
            </input>
            <label className={formData.type ==="Female"?('text-yellow-50'):''} htmlFor="Online-Mode">Female</label>
            </div>
</div>


            </fieldset> 

              </div>

          </div>
          <div className='flex justify-between'>
              <div>

                <div>Phone number</div>
                <input></input>
              </div>
              <div>

                <div>About</div>
                <input></input>
              </div>

          </div>
    </div>
    <div className='flex justify-end gap-3   p-6 w-[60%]   ml-[10%] mt-5 rounded-md '>
    <Link to='/dashboard/profile/edit'>
   <button className="  h-8 px-5 py-2 bg-slate-800 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
 

<div className="text-center text-gray-300 text-base font-medium leading-normal">Cancel</div>
</button>
</Link>
    <Link to='/dashboard/profile/edit'>
   <button className="  h-8 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
 

<div className="text-center text-gray-900 text-base font-medium leading-normal">Save</div>
</button>
</Link>
      
    </div>
    </div>
    
    </div>
 
  )
}

export default Edit