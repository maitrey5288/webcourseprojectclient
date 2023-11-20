import React from 'react'
  
import {HiOutlineRocketLaunch} from 'react-icons/hi2'
 
import { Link, matchPath } from 'react-router-dom'
 
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {IoNotificationsOutline} from "react-icons/io5"
 
import { setToken } from '../../slices/authSlice'

const Navbar = ( ) => {
 
    const {token} = useSelector( (state) => state.auth )
    const {user} = useSelector( (state) => state.profile )
    const {totalItems} = useSelector( (state) => state.cart )
console.log(token,"token",user,"user")

const location = useLocation();
console.log(location)
    const matchRoute = (route )=> {
        console.log(route)
        return matchPath({path:route},location.pathname) 
    }


  return (
    <div className='flex justify-between items-center w-full px-3 border-b border-slate-800 bg-gray-900 py-4 mx-auto'>
    <Link to="/">
        {/* <img src={logo} alt="Logo" width={160} height={32} loading='lazy' /> */}
      
        <div className=' flex items-center gap-2'>
    <div className='text-3xl text-white'>

       <HiOutlineRocketLaunch/>
    </div>

    <p className='text-white text-lg'>    Spark Tank </p>
        </div>
    </Link>

    <nav className=''>
        <ul className='flex gap-x-6  text-white'>
            <li className={matchRoute('/') && 'text-yellow-300'}>
                <Link to="/">Home</Link>
            </li>
            <li className={matchRoute('/about') && 'text-yellow-300'}>
                <Link to="/about">About</Link>
            </li>
            {/* <li className={matchRoute('/contact') && 'text-yellow-300'}>
                <Link to="/contact">Contact</Link>
            </li> */}
            {
                user &&  <li className={matchRoute('/showAllProjects') && 'text-yellow-300 '}>
                <Link to="/showAllProjects">Projects</Link>
            </li>
            }
            {
                user &&  <li className={matchRoute('/showAllInvestments') && 'text-yellow-300'}>
                <Link to="/showAllInvestments">Investment opportunities</Link>
            </li>
            }
            {/* {
              (user &&  user.accountType == 'Investor')?
                ( <li>
                                <Link to="investment">Create investment</Link>
                </li>
                )
                :
                (<></>)
            } */}

        </ul>
        </nav>
        <div className='flex items-center gap-x-4 ' >
           {!user && <Link to="/login">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border-richblack-700'>Login</button>
            </Link>}

            {!user && <Link to="/signup">
                <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border-richblack-700'>Sign Up</button>
            </Link>}


            {user && <div className='relative'>
           
            {/* <div className=' absolute text-sm text-center right-[-6px] top-[-5px] w-5 text-white rounded-full bg-red-500'><p>0</p></div> */}
            </div>}
            {/* {user && <Link to="/">
                <button   className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border-richblack-700'>Log Out</button>
            </Link>}
             */}
            {user && <Link to="/dashboard/profile" className='mx-3'>
                {/* <button className='bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border-richblack-700'>Dashboard</button> */}
                

             <img className='w-7 h-7 rounded-full' src={user.profile.profilePicture}/> 
              
            </Link>}
        </div>



    </div>
  )
// return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
//         <div className='flex w-11/12   items-center justify-between'>
//             <Link to='/'>
//                 <img></img>
//             </Link>

//             <nav >

//             <ul className='flex gap-x-6 text-richblack-25'>
//                 {
//                     NavbarLinks.map((link,index)=>(
//                         <li key={index}>
//                             {
//                                 <Link to={link?.path}>
//                                     <p className={`${matchRoute(link?.path) ? "text-yellow-200" : "text-richblack-200"}`}>
//                                         {link.title}
//                                     </p>
//                                 </Link>
//                             }
//                         </li>
//                     ))
//                 }
//             </ul>

                



//             </nav>

//         <div className='flex gap-x-4 items-center'>
                
//                 {
//                     user && user?.accountType != "Instructor" && (
//                         <Link to='/dashboard/cart' className='relative'>
//                             <AiOutlineShoppingCart/>
//                             {
//                                 totalItems > 0 && (
//                                     <span>
//                                         {totalItems}
//                                     </span>
//                                 )
//                             }
//                         </Link>
//                     )
//                 }
//                 {
//                     token === null && (
//                         <Link to='/login'>
//                             <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                 Log In
//                             </button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token === null && (
//                         <Link to='/signup'>
//                             <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                 Sign Up
//                             </button>
//                         </Link>
//                     )
//                 }
                


//         </div>


//         </div>
//     </div>
//   )
}

export default Navbar