import React from 'react'
import {BiEditAlt} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const ProfileDetails = () => {

    const {user} = useSelector( (state) => state.profile )
    console.log("userdetails profile",user)
  return (
    <div className='text-white w-[80%]'>
    
    <p className='font-semibold text-2xl m-4'>Profile</p>
    <div className='flex justify-between items-center p-6 w-[60%]   ml-[10%] mt-10 rounded-md bg-gray-900'>
   <div className='flex items-center gap-4'>
   <img className='w-14 h-14 rounded-full' src={user.profile.profilePicture}/> 
    <div>
    <div className="w-36 text-indigo-50 text-lg font-semibold leading-relaxed">{user.firstName} {user.lastName}</div>
        <div className="text-slate-500 text-sm font-normal leading-snug">{user.email}</div>
    </div>
   </div>
<Link to='/dashboard/profile/edit'>
   <button className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
<div className="w-[18px] h-[18px] relative text-gray-900 text-base" ><BiEditAlt/></div>

<div className="text-center text-gray-900 text-base font-medium leading-normal">Edit</div>
</button>
</Link>
    </div>

    <div className=' p-4 w-[60%]  ml-[10%] mt-10 rounded-md bg-gray-900'>
        <div className='flex justify-between items-center m-2'>
            <div className="w-[628px] text-indigo-50 text-lg font-semibold leading-relaxed">Personal Details</div>
            <Link to='/dashboard/profile/edit'>
            <button className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
                <div className="w-[18px] h-[18px] relative text-gray-900 text-base" ><BiEditAlt/></div>
                <div className="text-center text-gray-900 text-base font-medium leading-normal">Edit</div>
            </button>
            </Link>
        </div>

        <div className='flex m-2 justify-between'>
            <div className='w-full'>
                <div className="  text-gray-700 text-sm font-normal leading-snug">First Name</div>
                <div className="  text-indigo-50 text-sm font-medium leading-snug">{user.firstName}</div>
            </div>
            <div className='w-full'>
                <div className="  text-gray-700 text-sm font-normal leading-snug">Last Name</div>
                <div className="  text-indigo-50 text-sm font-medium leading-snug">{user.lastName}</div>
            </div>
        </div>
        <div className='flex m-2 justify-between'>
            <div className='w-full'>
                <div className="  text-gray-700 text-sm font-normal leading-snug">Email</div>
                <div className="  text-indigo-50 text-sm font-medium leading-snug">{user.email}</div>
            </div>
            <div className='w-full'>
                <div className="  text-gray-700 text-sm font-normal leading-snug">Phone No.</div>
                <div className="  text-indigo-50 text-sm font-medium leading-snug">{user.profile.contactNumber ? user.profile.contactNumber : '-'}</div>
            </div>
        </div>
        <div className='flex m-2 justify-between'>
            <div className='w-full'>
                <div className="  text-gray-700 text-sm font-normal leading-snug">About</div>
                <div className="  text-indigo-50 text-sm font-medium leading-snug">{user.profile.about ?  user.profile.about : '-'}</div>
            </div>
            
        </div>
         

    </div>


    </div>
  )
}

export default ProfileDetails