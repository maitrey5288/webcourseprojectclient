import React, { useState } from 'react'
import Card from '../Card';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
const AllInvestments = () => {
    const navigate = useNavigate()
    const [uploading ,setUploading] = useState(false)
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
        
        const requestOptions1 = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            
        };
        const response1 = await fetch('api/v1/getAllInvestments', requestOptions1);
        const data1 = await response1.json();
      
        setProjectsList(data1.InvestmentList)
        console.log("1213",data1.InvestmentList)
      
    }

    async function applyHandler(){
       
        
        let a = []
       console.log("view",viewvingproject)
           
             
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({investor:viewvingproject.user.email,token:token})
                };
                const response = await fetch('api/v1/getAllInvestments', requestOptions);
           console.log("ji")
           const data = await response.json();
           console.log(data,"contactData")
           
           setUploading(false)
           toast.dismiss()
           toast.success("Email is sent to teamMembers")
            
           navigate('/')
       }
    function projectOpener(project){
        setvp(project)
        setMode('view')
    }
    if(uploading){
        <h1>sending mail</h1>
    }
    else if(loading){
        getcategories();
    }
    else if(!projectList){
     
        getAllCourses()
        console.log("6",projectList)
    }
   
else{ 
    console.log(projectList,"here")
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
        ( <div className='w-[300px] bg-gray-800 bg-opacity-80 rounded-md overflow-hidden hover:shadow-inner hover:shadow-richblack-200'>
        <div className='relative '>
            <img onClick={() => projectOpener(project)} className='cursor-pointer  w-full ' src={project.thumbnail}/>
             
        </div>
        <div className='p-4 cursor-pointer' onClick={() => projectOpener(project)} >
            <p className='text-white font-semibold text-lg leading-6'>{project.title}</p>
            <p className='mt-2 text-white'>
            {
                project.about.length > 100 ? 
                project.about.substr(0,100) + '...' : project.about

            }
            </p>
        </div>



    </div>)
      )  )
    }
    </div>

    </div>}
    {
        mode == 'view' && 
        <div className='text-white my-2'>

<button className='hover:text-zinc-300 px-2' onClick={()=> {setMode('list')}}>{'< back'}</button>

 <div className='w-full justify-center flex'>

 <div className='w-[70%] bg-gray-900 rounded-md p-3 flex items-center flex-col gap-3'>
<p className='text-white text-3xl font-semibold px-3'>Investment Opp Details</p>
 <img  src={viewvingproject.thumbnail} className='rounded-[0.5rem] w-[50%] h-[50%]'/>

 <div className='w-full'>
    <p className='font-semibold'>Invesment Name:</p>
    <p className='bg-richblack-800 p-2 rounded-md'>{viewvingproject.title}</p>
 </div>
 <div className='w-full'>
    <p className='font-semibold'>About Invesment:</p>
    <p className='bg-richblack-800 p-2 rounded-md'>{viewvingproject.about}</p>
 </div>
 <div className='flex w-full gap-4'>

 
    
 <div className='w-full'>
    <p className='font-semibold'>Project Category:</p>
    <p className='bg-richblack-800 p-2 rounded-md'>{viewvingproject.category.name}</p>
 </div>

 </div>
 
 
 <div className='w-full flex justify-end'>
    
 <button onClick={applyHandler}  className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">

<div className="text-center text-gray-900 text-base font-medium leading-normal">Apply</div>
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

export default AllInvestments