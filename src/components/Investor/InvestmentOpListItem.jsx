import React from 'react'
import {RiDeleteBin6Line} from 'react-icons/ri'
import toast from 'react-hot-toast';
import { useState } from 'react'
import {  useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
 
const InvestmentOpListItem = ({li,deletefromlist}) => {
    const {token} = useSelector( (state) => state.auth )
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token:token,investmentId:li._id})
};
const [deleting,setDeleting] = useState(false);
const navigate = useNavigate();
    async function deleteHandler(){
        setDeleting(true)
        console.log(li._id)
        const response = await fetch('/api/v1/deleteInvestment', requestOptions);
        const data =await  response.json()
        if(!data.success){
            toast.dismiss()
            toast.error(data.message)
           setDeleting(false)
        }
        else{
        toast.dismiss()
        console.log("i am here")
        toast.success('Investment Opp Deleted');
        deletefromlist(li);
        setDeleting(false)
        }
    }

    function clickHandler(){
        navigate(`/dashboard/investment/view/${li._id}`)
    }

    if(deleting){
        return toast.loading('deleting the Investment Opp',{
            style: {
              color: 'red',
            },
          })
        }
    else{

  return (
    <div  className='flex text-white w-full p-2 justify-evenly'>
   <div onClick={clickHandler} className='cursor-pointer flex gap-4'>
    <img className="w-[221px] h-[148px] relative rounded-lg" alt="No image found" src={li.thumbnail} />
    <div className='flex flex-col gap-2'>

    <div className='text-white'   >titile : {li.title}</div>
    <div className='text-white'   >createdAt : {li.createdAt}</div>
    </div>
    </div>
    <div className='w-[10%] text-center text-zinc-300 text-2xl flex justify-center items-center gap-2' >
     

  <button onClick={deleteHandler} className=' hover:text-yellow-50'>

    <RiDeleteBin6Line/>
  </button>
    </div>
      </div>
  )
}
}

export default InvestmentOpListItem