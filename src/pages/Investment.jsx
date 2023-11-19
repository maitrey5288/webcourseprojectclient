import React from 'react'
 
import InvestmentOpList from '../components/Investor/InvestmentOpList'

import {Outlet} from 'react-router-dom'
const Investment = () => {
  
  return (

    <div className='flex h-full w-full'>

 

   

    <Outlet/>
    </div>
  )
}

export default Investment