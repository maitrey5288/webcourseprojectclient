import React from 'react'
import {IoMdAddCircleOutline} from 'react-icons/io'
import { Link } from 'react-router-dom'
import ProjectDetailsItem from './ProjectDetailsItem'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const ProjectDetails = () => {


  const [isLoading,setIsLoading] = useState(true)
  const [projectlist,setProjectsList] = useState([]);
  const {token} = useSelector( (state) => state.auth )
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({token:token})
};
async function getallprojects(){

  const response = await fetch('/api/v1/getProjectDetails', requestOptions);
  const data =await  response.json()
  setProjectsList(data.projects)
  console.log("projects",projectlist)
  setIsLoading(false)
}
function deletefromlist(project){
  console.log("deletingifnds")
  const newList = projectlist.filter((item) => item!== project);
  setProjectsList(newList);  
}
if(isLoading){
  getallprojects()

  return <h1 className='text-3xl text-white'>Loading ... </h1>
}
else if (projectlist.length ==0){
  return <h1 className='text-4xl text-white'>No Projects present  <Link className='text-yellow-50 hover:text-yellow-200' to='/dashboard/project/add'>click here to add..</Link> </h1>
}
else{
  return (
    <div className='w-[80%] p-5'>

    <div className='flex justify-between items-center'>
            <p className='text-white font-semibold text-2xl m-4'>Your Projects</p>
            <Link to='/dashboard/project/add'>
                  <button className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">
                        <div className="w-[18px] h-[18px] relative text-gray-900 text-xl" ><IoMdAddCircleOutline/></div>
                        <div className="text-center text-gray-900 text-base font-medium leading-normal">Add</div>
                  </button>
            </Link>
    </div>

    
    <div className='w-[90%] ml-5 mt-6 flex flex-col gap-3 rounded-lg  border-richblack-500 border-[1px] '>
        <div  className='flex text-white w-full  border-richblack-500 border-b-[1px] p-3'>
          <div className='w-[70%] text-center'>
            Project
          </div>
          <div className='w-[10%] text-center'>
            Type
          </div>
          <div className='w-[10%] text-center'>
            Category
          </div>
          <div className='w-[10%] text-center' >
            Actions
          </div>
        </div>
       
   
       {   projectlist.map((project)=>(
        <ProjectDetailsItem deletefromlist={deletefromlist} key={project._id} project={project}/> 
               ))}
    </div>


    </div>
  )
}
}
export default ProjectDetails