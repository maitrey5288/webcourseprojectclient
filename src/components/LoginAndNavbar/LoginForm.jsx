import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom/dist'
import { setUser } from '../../slices/profileSlice'
import { setToken } from '../../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
const LoginForm = () => {
    const dispatch = useDispatch();
    const {token} = useSelector( (state) => state.auth )
    const {user} = useSelector( (state) => state.profile )
const navigate = useNavigate();
const[formData,setFormData]  =useState({email :'',password: ""})
const[showPassword,setShowPassword] = useState(false)

        function changeHandler(event){
            setFormData((prevData) =>(
                {
                    ...prevData,
                    [event.target.name] : event.target.value
                }
            ) )
        }
            async function submitHandler(event){
            event.preventDefault();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            const response = await fetch('api/v1/login', requestOptions);
            const data = await response.json();
            

            dispatch(setUser(data.user));
            // console.log(data)
            console.log(user)
            toast.success("Logged In");
            localStorage.setItem('token',data.token)
            dispatch(setToken(data.token))
          
        }

  return (
    <form onSubmit={submitHandler}
    className='flex flex-col w-full gap-y-4 mt-6'
    >
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='email' value={formData.email} 
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
            />
        </label>
        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'  required type={showPassword ? ('text') : ('password')} value={formData.password} 
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
            />
            <span className='absolute right-3 top-[38px] cursor-pointer' onClick={()=> setShowPassword((prev)=>!prev)}>
                {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <Link to='#'>
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto '>
                    Forgot Password
                </p>
            </Link>

        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]'>Sign In</button>

    </form>
  )
}

export default LoginForm