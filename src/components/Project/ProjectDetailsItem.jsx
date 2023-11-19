import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { useSelector } from 'react-redux';
import EditProject from './EditVerify';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
 
const ProjectDetailsItem = ({project,deletefromlist}) => {
    const navigate = useNavigate();
const[mode,setMode] = useState('show')
    const {token} = useSelector( (state) => state.auth )
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token:token,projectId:project._id})
};
const [deleting,setDeleting] = useState(false);

async function deleteHandler(){
    setDeleting(true)
    const response = await fetch('/api/v1/deleteProject', requestOptions);
    const data =await  response.json()
    if(!data.success){
        toast.dismiss()
        toast.error(data.message)
       setDeleting(false)
    }
    else{
    toast.dismiss()
    console.log("i am here")
    toast.success('project Deleted');
    deletefromlist(project);
    setDeleting(false)
    }
}

function editHandler(){


    return navigate(`edit/${project._id}`)

}



if(deleting){
return toast.loading('deleting the project',{
    style: {
      color: 'red',
    },
  })
}
else{
  return (
   <div  className='flex text-white w-full p-2'>
    <div className='w-[70%] flex gap-4'>
    <img className="w-[221px] h-[148px] relative rounded-lg" alt="No image found" src={project.thumbnail} />
    <div className='flex flex-col justify-start gap-3'>
      <div className='text-white'>{project.name}:</div>
      <div className='text-gray-400'>{project.description}</div>
      <div className='text-zinc-200'>{project.createdAt}</div>
    </div>
    </div>
    <div className='w-[10%] text-center'>
     
    </div>
    <div className='w-[10%] text-center'>

    </div>
    <div className='w-[10%] text-center text-zinc-300 text-2xl flex justify-center items-center gap-2' >
    <button onClick={editHandler} className=' hover:text-yellow-50'>

    <BiEditAlt/>
    </button>

  <button onClick={deleteHandler} className=' hover:text-yellow-50'>

    <RiDeleteBin6Line/>
  </button>
    </div>
  </div> 
  )
}
}

export default ProjectDetailsItem