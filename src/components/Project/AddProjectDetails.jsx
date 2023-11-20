import React from 'react'
import uploadIcon from '../../assets/fi-rr-cloud-upload.svg'
import nextIcon from '../../assets/fi-rr-angle-small-right.svg'
import { useSelector } from 'react-redux'
import   { useState,useRef } from 'react'

const AddProjectDetails = ({setStepNo,formData,changeHandler,setImage,image}) => {
     
    function nextClickHandler(event){
        event.preventDefault();
        setStepNo(2)
        formData.thumbnail = image
        console.log(formData);
      }
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
 
     const inputRef = useRef(null);
    
    
      const handleImageClick = () => {
          inputRef.current.click();
        };
    
        const handleImageChange = (event) => {
          // console.log("hihihii",event.target.files)
          // const file = event.target.files[0];
          setImage(event.target.files[0])
          console.log("image",image)
          // inputRef.current.click();
    
        };

if(loading){
getcategories()
}
else
  return (
    <div className='mx-auto my-10 w-[70%] bg-gray-900'>
    <form className='p-4 flex flex-col gap-5' >

         <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Project title<sup className='text-pink-200'>*</sup>
            </p>
            <input className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='text' value={formData.name} 
                onChange={changeHandler}
                placeholder='Enter project title'
                name='name'
            />
         </label>     

         <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Project Description<sup className='text-pink-200'>*</sup>
            </p>
            <textarea rows={5} cols={5}  className= 'resize-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' required type='text' value={formData.description} 
                onChange={changeHandler}
                placeholder='Enter project description'
                name='description'
            />
         </label>    
         <fieldset className='text-white'>
            <legend className='m-2'>
                Mode<sup className='text-pink-200'>*</sup> :

            </legend>
            <div className='bg-richblack-800 w-[50%] rounded-lg p-3 flex flex-col gap-2'>

            

           <div>
            <input  className='accent-yellow-50'
            type ="radio"
            onChange={changeHandler}
            name="type"
            value="Software"
            id="Offline-Mode"
            checked={formData.type ==="Software"}
            >
            </input>
            <label className={formData.type ==="Software"?('text-yellow-50'):''}  htmlFor="Offline-Mode"> Software</label>
</div>
<div>
            <input className='accent-yellow-50'
            type ="radio"
            onChange={changeHandler}
            name="type"
            value="Hardware"
            id="Online-Mode"
            checked={formData.type ==="Hardware"}
            >
            </input>
            <label className={formData.type ==="Hardware"?('text-yellow-50'):''} htmlFor="Online-Mode">Hardware</label>
            </div>
</div>


            </fieldset> 

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

    <button onClick={nextClickHandler} className="w-24 h-10 px-5 py-2 bg-yellow-400 rounded-lg shadow-inner justify-start items-center gap-2 inline-flex">

<div className="text-center text-gray-900 text-base font-medium leading-normal">Next </div><img src={nextIcon}></img>
</button>
    </div> 
    </form>
</div>
  )
}

export default AddProjectDetails