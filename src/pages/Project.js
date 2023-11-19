import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

const  Project = () => {
  const [setSelectedOption] = useOutletContext()
 
  return (
    <Outlet context={[setSelectedOption]}/>
   
  )
}

export default  Project