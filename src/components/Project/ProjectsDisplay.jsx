import React, { useState } from 'react'
import Card from '../Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
 
const ProjectsDisplay = () => {
  
    const [category,setCategeories] = useState({name : ""})
    const [loading,setLoading] = useState(true);
    async function getcategories(){

        const requestOptions = {
            method: 'GET',
        };
        const response = await fetch('/api/v1/getallCategories', requestOptions);
        const data = await response.json();
        setCategeories(data.catagories) 
    console.log("hijiejdi",category)
    setLoading(false)
    }
    const {token} = useSelector( (state) => state.auth )
    const {user} = useSelector( (state) => state.profile )
    const [projectList,setProjectsList] = useState(false)
    const [likedProjects , setLikedProjects] = useState(false) ;
    const[projectcategory,setCategeory] = useState('All')
    const [type,setType] = useState('All')
    const [mode,setMode] = useState('list')
    const [viewvingproject,setvp] = useState(false)
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
        const response = await fetch('api/v1/getLikedProjects', requestOptions);
        const data = await response.json();

        setLikedProjects(data.projectList)
        const requestOptions1 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            
        };
        const response1 = await fetch('api/v1/getAllProjects', requestOptions1);
        const data1 = await response1.json();
        setProjectsList(data1.projectList)
      
    }

   
    function projectOpener(project){
        setvp(project)
        setMode('view')
    }
    if(loading){
        getcategories();
    }
    else if(!projectList){
     
        getAllCourses()
        
    }
   
else{
    console.log(projectList)
  return (
    <>
{
  mode == 'list'  &&  
    <div>
    <div className=' bg-gray-900 mb-2 p-2'>
    <div className='flex justify-between'>

    <p className='text-white text-4xl font-semibold py-1 px-3'>All Projects</p>
    
    {user.accountType == 'ProjectOwner' &&
    (<Link to='/dashboard/project'>

    <p className='text-white font-semibold py-1 px-3 cursor-pointer hover:text-yellow-50'>{'Your Projects >'}</p>
    </Link>)}
    </div>
    
    <div className='flex gap-4  justify-center items-center w-full'>

     <div className='flex     items-center gap-2'>

            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Category 
            </p>
            <select onChange={changeHandler}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[5px] border-richblack-200 border'
             defaultValue={'All'}
             
             name = 'category'
             >
              
             <option value='All' >All</option>
             {   category.map((category,index)=>{
                  return  <option value={category.name} key={index}>{category.name}</option>
               })}
             </select>
  
     </div>
     <div className='flex    items-center gap-2'>

            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Type 
            </p>
            <select onChange={typeChanger}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5  border-richblack-200 border  p-[5px]'
             defaultValue={'All'}
             
            
             >
             
             <option value='All' >All</option>
             <option value='Software' >Software</option>
             <option value='Hardware' >Hardware</option>
             
             </select>
  
     </div>
     </div>
    </div>
    <div className='flex flex-wrap justify-center gap-4 mb-4'>
    {
       projectList.map( (project)=>(
        (project.category.name == projectcategory || projectcategory == 'All') && (project.type == type || type == 'All') &&
        (<Card key={project._id} 
        project={project} 
        projectOpener = {projectOpener}
        likedProjects={likedProjects} 
        setLikedProjects={setLikedProjects}/>)
      )  )
    }
    </div>

    </div>}
    {
        mode == 'view' && 
        <div className='text-white my-2'>

        <button className='hover:text-zinc-300' onClick={()=> {setMode('list')}}>{'< back'}</button>
         <div className='w-full justify-center flex'>

         <div className='w-[70%] bg-gray-900 rounded-md p-3 flex items-center flex-col gap-3'>
         <img src={viewvingproject.thumbnail} className='rounded-[0.5rem]'/>

         <div className='w-full'>
            <p className='font-semibold'>Project Name:</p>
            <p className='bg-richblack-800 p-2 rounded-md'>{viewvingproject.name}</p>
         </div>
         <div className='w-full'>
            <p className='font-semibold'>Project Description:</p>
            <p className='bg-richblack-800 p-2 rounded-md'>{viewvingproject.description}</p>
         </div>
         <div className='flex w-full gap-4'>

         <div className='w-full'>
            <p className='font-semibold'>Project Type:</p>
            <p className='bg-richblack-800 p-2 rounded-md'>{viewvingproject.type}</p>
         </div>
         <div className='w-full'>
            <p className='font-semibold'>Project Category:</p>
            <p className='bg-richblack-800 p-2 rounded-md'>{viewvingproject.category.name}</p>
         </div>

         </div>
        <div className='w-full'>
        <p>Team Members</p>
       { viewvingproject.teamMembers.map((member,index)=>{
                  return  <>
                  <p className='bg-richblack-800 p-2 rounded-md' key={index}>{index+1} {')'} {member.firstName} {member.lastName} -- {'('} {member.email} {')'}</p>
                  </>
               })
               }
        </div>
         
         <div className='w-full flex justify-end'>
            
         <button   className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">

<div className="text-center text-gray-900 text-base font-medium leading-normal">Contact </div>
</button>
         </div>
 
         
         </div>
         </div>
        </div>
    }
    </>
  )
}
}

export default ProjectsDisplay