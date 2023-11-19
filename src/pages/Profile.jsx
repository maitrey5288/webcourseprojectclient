import React from 'react'
import {BiEditAlt} from 'react-icons/bi'
import { Outlet, useOutletContext } from 'react-router-dom'
const Profile = () => {
  const [setSelectedOption] = useOutletContext()
  return (
  <Outlet context={[setSelectedOption]}/>
  )
}

export default Profile