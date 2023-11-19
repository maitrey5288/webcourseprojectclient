import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import InvestmentOpListItem from './InvestmentOpListItem'
import {IoMdAddCircleOutline} from 'react-icons/io'
import { Link } from 'react-router-dom'
const InvestmentOpList = () => {
  const navigate = useNavigate();
    const {token} = useSelector( (state) => state.auth )
 
    const [ls,setLs] = useState([])
   const[loading,setLoading] = useState(true)
    async function fetchList(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token:token})
      };
      const response = await fetch('/api/v1/getInvestmentOpList', requestOptions);
      console.log(response)
      const data = await response.json();
      console.log("data",data)
      setLs(data.list);
      setLoading(false)
    }
    
    function deletefromlist(li){
      console.log("deletingifnds")
      const newList = ls.filter((item) => item!== li);
      setLs(newList);  
    }
   
   
  if(loading){
    fetchList()
    return(  
    <p className='text-white text-3xl'>Loading ...</p>
   )
  }
  else{
    return (
      


      <div className='w-[80%] p-5'>

      <div className='flex justify-between items-center'>
            <p className='text-white font-semibold text-2xl m-4'>Your Investment opportunities</p>
            <Link to='/dashboard/investment/createInvestmentOp'>
                  <button className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
                        <div className="w-[18px] h-[18px] relative text-gray-900 text-xl" ><IoMdAddCircleOutline/></div>
                        <div className="text-center text-gray-900 text-base font-medium leading-normal">Add</div>
                  </button>
            </Link>
    </div>
    <div className='w-[90%] ml-5 mt-6 flex flex-col gap-3 rounded-lg  border-richblack-500 border-[1px] '>
    <div  className='flex text-white w-full justify-evenly  border-richblack-500 border-b-[1px] p-3'>
          <div className='w-[70%] text-center'>
            Project
          </div>
           
          <div className='w-[30%] text-center' >
            Actions
          </div>
        </div>
        {   ls.map((li,index)=>(
        <InvestmentOpListItem key={li._id} li={li} deletefromlist={deletefromlist}  />
        
                 ))}
        
        </div>
      
  
     
      </div>
     
    )
        }
  }

export default InvestmentOpList