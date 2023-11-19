import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import   { useRef } from 'react'
import {   useNavigate    } from 'react-router-dom'
import uploadIcon from '../../assets/fi-rr-cloud-upload.svg'

    
const CreateInvestmentOp = () => {
    const navigate = useNavigate()
    const [image,setImage] = useState(false)
  const {category} = useSelector((state)=> state.category)
  const finalData = new FormData()
  const {token} = useSelector( (state) => state.auth )
  const[formData,setFormData]  =useState({})
  const [uploading ,setUploading] = useState(false)
  function changeHandler(event){
    const{name,value,checked,type} = event.target
    console.log(event.target.value,name,value)
    setFormData((prevData) =>(
        {
            ...prevData,
            
               
               [name]  : value
        }
    ) )
}
 
const inputRef = useRef(null);
const handleImageClick = () => {
  inputRef.current.click();
};
const handleImageChange = (event) => {
  
  setImage(event.target.files[0])
  console.log("image",image)
 

};


async function submitHandler(event){
    setUploading(true)

  event.preventDefault()
    finalData.append('title',formData.title)
    finalData.append('about',formData.about)
    finalData.append('thumbnail',image)
    finalData.append('categoryName',formData.category)
    finalData.append('deadline',formData.deadline)
    finalData.append('token',token)

    console.log(finalData,formData)
    const response = await fetch('/api/v1/createInvestmentOp', {
     method : 'POST',
     body : finalData
    });
    const data = await response.json();
    if(!data.success){
      toast.dismiss()
      toast.error(data.message)
      setUploading(false)
    }
    else
    {console.log(data,"upload resp")
    setUploading(false)
     toast.dismiss()
     toast.success("Invesment Created Successfully")
     navigate('/dashboard/investment')}

}

	 


  
if(uploading){

  
    return toast.loading('Creating Investment')
}
    else
{
  return (
    <div className='mx-auto my-10 w-[70%] bg-gray-900'>

<form className='p-4 flex flex-col gap-5' onSubmit={submitHandler}>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                 Title<sup className='text-pink-200'>*</sup>
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='text' value={FormData.title} 
                onChange={changeHandler}
                placeholder='Enter Investment title'
                name='title'
            />
         </label>
         <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                About Investment<sup className='text-pink-200'>*</sup>
            </p>
            <textarea rows={5} cols={5}  className= 'resize-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='text' value={formData.about} 
                onChange={changeHandler}
                placeholder='Enter Investment description'
                name='about'
            />
         </label>
         <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Category<sup className='text-pink-200'>*</sup>
            </p>
             <select onChange={changeHandler}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
             defaultValue={''}
             value={formData.category}
             name = 'category'
             >
             <option value='' disabled>Choose a category</option>
             {   category.map((category,index)=>{
                  return  <option value={category.name} key={index}>{category.name}</option>
               })}
             </select>
         </label>   

         <label className='w-[40%]'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Deadline<sup className='text-pink-200'>*</sup>
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='date' value={formData.deadline} 
                onChange={changeHandler}
             
                name='deadline'
                min={new Date().toISOString().split('T')[0]}
            />
            

  
         </label> 
         <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Thumbnail<sup className='text-pink-200'>*</sup>
            </p>
            <div>
           
         {image ?  (<div ><img src={URL.createObjectURL(image)}></img></div>) :( <div  className='w-full rounded-[0.5rem] bg-richblack-800 flex gap-3 flex-col items-center justify-center p-4'>
                <div  onClick={handleImageClick}>

                <img src={uploadIcon}/>
                </div>
                <div className='text-richblack-200 w-full text-center'>Drag and drop an image, or <p className='text-yellow-50'>Browse</p> Max 6MB each</div>
                <div className="w-full text-center flex items-center justify-center gap-3">
                    <div className="text-gray-500 text-xs font-semibold leading-tight">&#x2022; Aspect ratio 16:9</div>
                    <div className="text-gray-500 text-xs font-semibold leading-tight">&#x2022; Recommended size 1024x576</div>
                </div>
            </div>)}
           
            </div>
          
            <input
            type='file'
            ref={inputRef}
            onChange={handleImageChange}
            style={{display : 'none'}}
            ></input>
         
         </label> 
         <div className='w-full flex justify-end'>

<button   className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-center items-center gap-2 inline-flex">

<div className="text-center text-gray-900 text-base font-medium leading-normal"> Create </div> 
</button>
</div> 
        </form>

    
    </div>
  )}
}

export default CreateInvestmentOp
 