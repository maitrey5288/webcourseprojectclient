import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
const ViewInvestment = () => {
    // console.log("adjiwfjewkfvsdc")
    const params = useParams()
    const [loading,setLoading] = useState(true);
    console.log("Fas",loading) 
    const [investmentData ,setInvestmentData] = useState([]);
    const {token} = useSelector( (state) => state.auth )
    useEffect(() => {
     
         setLoading(true)
      
      }, [params]);
    
    async function loadInvestment(){
        
        console.log("hihu")
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id:params.id,token:token})
            };
            const response = await fetch('/api/v1/getInvestmentById', requestOptions);
            const data = await response.json();
            setInvestmentData(data.investment,"jiasjc");
            console.log(investmentData,"here")
        setLoading(false);    
    }

    if(loading){
        loadInvestment()
        return <h1 className='text-4xl text-white'>Loading ...</h1>
    }
    else{
    return (
        <>
        <Link to='/dashboard/investment' className='text-white text-2xl'>
            <p> {'< back'} </p>
        </Link>
        <div className='mx-auto my-10 w-[50%] bg-gray-900'>
        <div className='p-4 flex flex-col gap-5 justify-center items-center text-white text-2xl'>
         
                <img className="w-[260px] h-[160px] relative rounded-lg" alt="No image found" src={investmentData.thumbnail} />
                
                <div className='flex gap-1 w-full border-b border-slate-800'>
                    <div>
                       Title : 
                    </div>
                    <div>
                        { investmentData.title}
                    </div>
                </div>

                <div className='w-full border-b border-slate-800'>

                    <div className='font-semibold  '>About Invesment :</div>
                    <div className='text-base'>{investmentData.about}</div>
                </div>
                <div className='w-full border-b border-slate-800'>

                    <div className='font-semibold  '>Category :</div>
                    <div className='text-base'>{investmentData.category.name}</div>
                </div>

           
             
              
        

 


     
    </div>
    </div>
    </>
  )
    }
}

export default ViewInvestment