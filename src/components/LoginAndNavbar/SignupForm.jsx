import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { Navigate, useNavigate } from 'react-router-dom/dist'

const SignupForm = ({setIsLoggedIn}) => {
    const [formData,setFormData]  =useState({email :'',
    password: "",
    firstName :'',
    lastName :'',
    confirmPassword:""

})
const navigate = useNavigate();
const[loading,setLoading] = useState(false)
    const[showPassword,setShowPassword] = useState(false)
    const[showCNFPassword,setShowCNFPassword] = useState(false)
    const[accountType,setAccountType] =useState("ProjectOwner");
            function changeHandler(event){
                setFormData((prevData) =>(
                    {
                        ...prevData,
                        [event.target.name] : event.target.value
                    }
                ) )
            }

            async function submitHandler(event){
                setLoading(true)
                event.preventDefault();
               if(formData.password !== formData.confirmPassword){
                toast.dismiss()
                toast.error("Passwords do not match");
                setLoading(false);
                return; 
               }
               formData.accountType = accountType
               const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
                };
                const response = await fetch('api/v1/signup', requestOptions);
                const data = await response.json();
                if(data.success)
                {  
                    toast.dismiss()
                    toast.success("Account Created");
                    setLoading(false)
                    
                    navigate('/showVerify ')
                }   
                else{
                   toast.dismiss()
                toast.error(data.message);
               }
               setLoading(false)
            }
  if(loading){
    toast.loading('creating user..')
  }
  
    return (
    <div>
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full w-full'>
            
            <button className={`w-full  ${accountType === "ProjectOwner" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType("ProjectOwner")}>
            ProjectOwner
            </button>

            <button className={`w-full ${accountType === "Investor"? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setAccountType("Investor")}>
                Investor
            </button>
        </div>
        <form onSubmit={submitHandler} >
        <div className='flex gap-x-4 w-full mt-4'>

       
            <label className='w-full '>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                <input 
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    required
                    type='text'
                    name='firstName'
                    onChange={changeHandler}
                    placeholder='Enter First Name'
                    value={formData.firstName}
                />
                </label>
                <label className='w-full '>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                <input 
className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    required
                    type='text'
                    name='lastName'
                    onChange={changeHandler}
                    placeholder='Enter Last Name'
                    value={formData.lastName}
                />

            </label>
            </div>
<div className='mt-4'>
            <label className='w-full '>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                <input 
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    required
                    type='email'
                    name='email'
                    onChange={changeHandler}
                    placeholder='Enter Email Name'
                    value={formData.email}
                />

            </label>
</div>
            <div className='w-full flex gap-x-4 mt-4'>
            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    required
                    type={showPassword ? ('text') : ('password')}
                    name='password'
                    onChange={changeHandler}
                    placeholder='Enter password'
                    value={formData.password}
                />
                             <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=> setShowPassword((prev)=>!prev)}>
                                {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                            </span>
            </label>
            <label className='w-full relative'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    required
                    type={showCNFPassword ? ('text') : ('password')}
                    name='confirmPassword'
                    onChange={changeHandler}
                    placeholder='Confirm password'
                    value={formData.confirmPassword}
                />
  <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=> setShowCNFPassword((prev)=>!prev)}>
                {showCNFPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>
            </label>
            </div>
            <button disabled={loading} className='bg-yellow-50 disabled:bg-yellow-700 w-full rounded-[8px] font-medium mt-6 text-richblack-900 px-[12px] py-[8px]'>Create Account</button>


        </form>
    </div>
  )
}

export default SignupForm