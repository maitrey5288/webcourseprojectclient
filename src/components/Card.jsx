import React, { useState } from 'react'
import {FcLike,FcLikePlaceholder} from "react-icons/fc"
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Card = ({project,likedProjects,setLikedProjects,projectOpener}) => {
    const navigate = useNavigate()
    const {token} = useSelector( (state) => state.auth )
    const [likesCount,setLikesCount] = useState(project.likesCount)
    async function clickHandler(){
        if(likedProjects.includes(project._id)){
            setLikesCount(likesCount-1)
            setLikedProjects( (prev)=> prev.filter((cid)=> (cid !== project._id)) );
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({token : token,projectId:project._id})
                };
                const response = await fetch('api/v1/unlikeProject', requestOptions);
                const data = await response.json();
                
          
            toast.success("like removed");
            
            console.log(likedProjects)
        }
        else{
            
            if(likedProjects.length ===0){
                setLikedProjects([project._id]);
            }
            else{
                setLikedProjects((prev) => [...prev,project._id]);
                
            } 
            setLikesCount(likesCount+1)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify({token : token,projectId:project._id})
                };
                const response = await fetch('api/v1/likeProject', requestOptions);
                const data = await response.json();
                
                
            console.log(likedProjects)
            toast.success("liked");

        }
    }
  return (
    <div className='w-[300px] bg-gray-800 bg-opacity-80 rounded-md overflow-hidden hover:shadow-inner hover:shadow-richblack-200'>
        <div className='relative '>
            <img onClick={() => projectOpener(project)} className='cursor-pointer  w-full ' src={project.thumbnail}/>
            <div className='hover:border-red-400 hover:border w-[40px] h-[40px] bg-white rounded-full absolute right-2 bottom-[-12px] grid place-items-center'>
                <button  onClick={clickHandler}>
                   {
                    likedProjects.includes(project._id) ? (<FcLike fontSize="1.75rem" />) : (<FcLikePlaceholder fontSize="1.75rem"/>)
                    }
                </button>
            </div>
                <p className='text-white absolute right-6 bottom-[-35px]'>{likesCount}</p>
        </div>
        <div className='p-4 cursor-pointer' onClick={() => projectOpener(project)} >
            <p className='text-white font-semibold text-lg leading-6'>{project.name}</p>
            <p className='mt-2 text-white'>
            {
                project.description.length > 100 ? 
                project.description.substr(0,100) + '...' : project.description

            }
            </p>
        </div>



    </div>
  )
}

export default Card