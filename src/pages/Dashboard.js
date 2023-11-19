import React, { useState } from 'react'
import profileSVG from '../assets/fi-rr-user.svg'
import profileSVGwhite from '../assets/fi-rr-user copy.svg'
import setting from '../assets/fi-rr-flower.svg'
import logout from '../assets/fi-rr-sign-out.svg'
import projectsvg from '../assets/projects-svgrepo-com.svg'
import projectsvgyellow from '../assets/projects-svgrepo-com copy.svg'
import Profile from './Profile'
import { Link, Navigate, Outlet, Route, Routes, matchPath, useLocation } from 'react-router-dom'
import UploadProject from './Project'
import { setUser } from '../slices/profileSlice'
import { setToken } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = () => {
   const dispatch = useDispatch()
   const {user} = useSelector( (state) => state.profile )
   const location = useLocation()
   console.log(location,"location")
const [selectedOption,setSelectedOption] = useState(location.pathname)
  function logoutHandler(){
    localStorage.removeItem('token')
    dispatch(setToken(false))
    dispatch(setUser(false))
   
    
  }
   
    

  return (
    <div className='flex h-full w-full'>
      
  
   <div className=' bg-gray-900 w-[20%] max-h-max min-h-screen py-[30px] border-r border-slate-800 flex-col justify-start items-start gap-2.5 inline-flex'>
    
    <div className="self-stretch h-[190px] flex-col justify-start items-start flex">
       
    <Link to='/dashboard/profile' onClick={()=>{setSelectedOption('/dashboard/profile')}} >
        {selectedOption =='/dashboard/profile' ? 
        
        (<div className="self-stretch px-6 py-2 bg-yellow-950 border-l border-yellow-400 justify-start items-center gap-3 inline-flex">
              <div className="w-4 h-4 relative" ><img src={profileSVG}></img></div>
              <div className="text-yellow-400 text-sm font-medium leading-snug">My Profile</div>
        </div>) :
        
         (<div className="self-stretch px-6 py-2 justify-start items-center gap-3 inline-flex">
              <div className="w-4 h-4 relative" ><img  src={profileSVGwhite}></img></div>
              <div className="text-slate-500 text-sm font-medium leading-snug">My Profile</div>
        </div>)
        }
        </Link>

      {  user.accountType == 'ProjectOwner' && 
       <Link to='/dashboard/project' onClick={()=>{setSelectedOption('/dashboard/project')}}>
        {selectedOption=='/dashboard/project' ? (<div className="self-stretch px-6 py-2 bg-yellow-950 border-l border-yellow-400 justify-start items-center gap-3 inline-flex">
              <div className="w-4 h-4 relative" ><img src={projectsvgyellow}></img></div>
              <div className="text-yellow-400 text-sm font-medium leading-snug">Projects</div>
        </div>) : ( <div   className="self-stretch px-6 py-2 justify-start items-center gap-3 inline-flex">
              <div className="w-4 h-4 relative" ><img  src={projectsvg}></img></div>
              <div className="text-slate-500 text-sm font-medium leading-snug">Projects</div>
        </div>)}
</Link>}
      {  user.accountType == 'Investor' && 
       <Link to='/dashboard/investment' onClick={()=>{setSelectedOption('investment')}}>
        {selectedOption=='investment' ? (<div className="self-stretch px-6 py-2 bg-yellow-950 border-l border-yellow-400 justify-start items-center gap-3 inline-flex">
              <div className="w-4 h-4 relative" ><img src={projectsvgyellow}></img></div>
              <div className="text-yellow-400 text-sm font-medium leading-snug">Invesment</div>
        </div>) : ( <div   className="self-stretch px-6 py-2 justify-start items-center gap-3 inline-flex">
              <div className="w-4 h-4 relative" ><img  src={projectsvg}></img></div>
              <div className="text-slate-500 text-sm font-medium leading-snug">investment</div>
        </div>)}
</Link>}
       
         
    <div className="self-stretch px-4 py-1 justify-start items-center gap-3 inline-flex">
        <div className="grow shrink basis-0 h-[0px] border border-gray-700"></div>
    </div>
   
    
        <div className="self-stretch px-6 py-2 justify-start items-center gap-3 inline-flex">
            <div className="w-4 h-4 relative" ><img src={setting}></img></div>
            <div className="text-slate-500 text-sm font-medium leading-snug">Settings</div>
        </div>
        <div onClick={logoutHandler} className="self-stretch px-6 py-2 justify-start items-center gap-3 inline-flex cursor-pointer">
            <div className="w-4 h-4 relative" ><img src={logout}></img></div>
            <div  className="text-slate-500 text-sm font-medium leading-snug">Log Out</div>
        </div>
    </div>
 
</div>
 <Outlet context={[setSelectedOption]}/>
     
      
   </div>
  )
}

export default Dashboard