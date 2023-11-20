import React, { useState } from 'react'
import { Link, matchPath, useLocation, useOutletContext } from 'react-router-dom'
import { setUser } from '../../slices/profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Edit = ( ) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [setSelectedOption] = useOutletContext()
  setSelectedOption('profile')
  const location = useLocation();
  const [uploading ,setUploading] = useState(false)
  console.log(location.pathname)
  const {user} = useSelector( (state) => state.profile )
  const {token} = useSelector( (state) => state.auth )
  console.log("profile user" ,user)
  const[formData,setFormData]  =useState({dateOfBirth:user.profile.dateOfBirth,contactNumber:user.profile.contactNumber,about:user.profile.about,gender:user.profile.gender})
  const finaldata = new FormData();
  function changeHandler(event){
    const{name,value,checked,type} = event.target
    setFormData((prevData) =>(
      {
            ...prevData,
            
               
               [name]  : value
        }
    ) )
          console.log("event name : ",name,value,formData.contactNumber)
}
 
async function submitHandler(event){
 
  setUploading(true)
  event.preventDefault();
  
 
 finaldata.append('dateOfBirth',formData.dateOfBirth)
 finaldata.append('token',token)
 finaldata.append('about',formData.about)
 finaldata.append('contactNumber',formData.contactNumber)
 finaldata.append('gender',formData.gender)
 

 console.log(formData)
 const response = await fetch('/api/v1/editProfile', {
  method : 'POST',
  body : finaldata
 });
 const data = await response.json();
 console.log(data,"profiledata")
 
 setUploading(false)
 toast.dismiss()
 toast.success("Profile Updated Successfully")
 const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({token:token})
};
const response1 = await fetch('/api/v1/getUserData', requestOptions);
const data1 = await response1.json(); 
console.log(data1)
dispatch(setUser(data1.user))
 navigate('/dashboard/profile')
  }
 
  return (
    <div className='text-white w-[80%]'>
    <div>
     <div className='flex justify-between items-center p-6 w-[60%]   ml-[10%] mt-10 rounded-md bg-gray-900'>
   <div className='flex items-center gap-4'>
   <img className='w-14 h-14 rounded-full' src={user.profile.profilePicture}/> 
  <div>
    <div className="w-full text-indigo-50 text-lg font-semibold leading-relaxed">{user.firstName} {user.lastName}</div>
      
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
            name="gender"
            value="Male"
            id="Offline-Mode"
            checked={formData.gender ==="Male"}
            >
            </input>
            <label className={formData.gender ==="Male"?('text-yellow-50'):''}  htmlFor="Offline-Mode"> Male</label>
</div>
<div className='flex gap-1'>
            <input className='accent-yellow-50'
            type ="radio"
            onChange={changeHandler}
            name="gender"
            value="Female"
            id="Online-Mode"
            checked={formData.gender ==="Female"}
            >
            </input>
            <label className={formData.gender ==="Female"?('text-yellow-50'):''} htmlFor="Online-Mode">Female</label>
            </div>
</div>


            </fieldset> 

              </div>

          </div>
          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
               About user<sup className='text-pink-200'>*</sup>
            </p>
            <textarea rows={5} cols={5}  className= 'resize-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='text' value={formData.about} 
                onChange={changeHandler}
                placeholder='Enter about yourself'
                name='about'
            />
         </label>   
          <div className=' '>
              <div >

                <div>Phone number</div>
                <input value={formData.contactNumber == null ? 0 : formData.contactNumber} type='number' className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[50%] p-[10px]'
                onChange={changeHandler}
                name= "contactNumber"
                ></input>
              </div>
              

          </div>
    </div>
    <div className='flex justify-end gap-3   p-6 w-[60%]   ml-[10%] mt-5 rounded-md '>
    <Link to='/dashboard/profile'>
   <button className="  h-8 px-5 py-2 bg-slate-800 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
 

<div className="text-center text-gray-300 text-base font-medium leading-normal">Cancel</div>
</button>
</Link>
    
   <button onClick={submitHandler} className="  h-8 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
 

<div className="text-center text-gray-900 text-base font-medium leading-normal">Save</div>
</button>
 
      
    </div>
    </div>
    
    </div>
 
  )
}

export default Edit