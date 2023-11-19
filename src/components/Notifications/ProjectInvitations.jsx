import React, { useState } from 'react'
import Card from '../Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
 
const ProjectInvitations = () => {
   
    const {category} = useSelector((state)=> state.category)
    const {token} = useSelector( (state) => state.auth )
    const {user} = useSelector( (state) => state.profile )
    const [projectList,setProjectsList] = useState(false)
    const [likedProjects , setLikedProjects] = useState(false) ;
    const[projectcategory,setCategeory] = useState('All')
    const [type,setType] = useState('All')

    function changeHandler(event){
        setCategeory(event.target.value)
    }
    function typeChanger(event){
        setType(event.target.value)
    }

    async function getAllCourses(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({token : token})
            
        };
        const response = await fetch('api/v1/getInvitedProjects', requestOptions);
        const data = await response.json();

         
        setProjectsList(data.projectList)
       
    }

   


    if(!projectList){
     
        getAllCourses()
        
    }
   
else{
     
  return (
    <div>
    <div className=' bg-gray-900 mb-2 p-2'>
    <div className='flex justify-between'>

    <p className='text-white text-4xl font-semibold py-1 px-3'>All Projects</p>
    
    {user.accountType == 'ProjectOwner' &&
    (<Link to='/dashboard/project'>

    <p className='text-white font-semibold py-1 px-3 cursor-pointer hover:text-yellow-50'>{'Your Projects >'}</p>
    </Link>)}
    </div>
    </div>
    
    
    <div className='flex flex-wrap justify-center gap-4 mb-4'>
    {
       projectList.map( (project)=>(
        (project.category.name == projectcategory || projectcategory == 'All') && (project.type == type || type == 'All') &&
        (<Card key={project._id} 
        project={project} 
        likedProjects={likedProjects} 
        setLikedProjects={setLikedProjects}/>)
      )  )
    }
    </div>

    </div>
  )
}
}



export default ProjectInvitations