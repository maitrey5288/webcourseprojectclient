import React from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import "./App.css";
import Navbar from "./components/LoginAndNavbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { setUser } from './slices/profileSlice'
import {setCategeory} from './slices/categorySlice'
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import UploadProject from './pages/Project';
import Project from './pages/Project';
 
import Edit from './components/Profile/Edit';
import ProfileDetails from './components/Profile/ProfileDetails';
 import ProjectDetails from './components/Project/ProjectDetails';
import AddNewProject from './components/Project/AddNewProject';
import EditVerify from './components/Project/EditVerify';
import VerifyToken from './components/VerifyToken';
import ShowVerify from './components/ShowVerify';
import Investor from './components/Investor';
import CreateInvestmentOp from './components/Investor/CreateInvestmentOp';
import Investment from './pages/Investment';
import ViewInvestment from './components/Investor/ViewInvestment';
import InvestmentOpList from './components/Investor/InvestmentOpList';
import ProjectsDisplay from './components/Project/ProjectsDisplay';
import Notification from './pages/Notification';
import AllInvestments from './components/Investor/AllInvestments';

 
 
 function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector( (state) => state.auth )
  const {user} = useSelector( (state) => state.profile )

  const {category} = useSelector((state)=> state.category)
 

 
  const [isLoading, setIsLoading] = useState(true);
   
  async function getdata(token){
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token:token})
    };
    const response = await fetch('/api/v1/getUserData', requestOptions);
    const data = await response.json(); 
    console.log(data)
    dispatch(setUser(data.user))
   
   
  }
  async function getcategories(){

    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch('/api/v1/getallCategories', requestOptions);
    const data = await response.json();
    dispatch(setCategeory(data.catagories))
console.log("hijiejdi",category)
setIsLoading(false)
}
  useEffect(() => {
     
    if(token){
      getdata(token)
       getcategories()
      
      }
     else{
      setIsLoading(false)
     }
  
  }, []);

 
  
  if (isLoading) {
    console.log("loading")
    return <div style={{ color: 'black' }}>Loading...</div>;
 }
else{

  return (
  
      
    <div className="w-[100vw] min-h-screen bg-richblack-900 flex flex-col">
    <Navbar  />
    
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<p>About</p>}/>
      <Route path='/contact' element={<p>Contact</p>}/>
      <Route path='/showVerify' element={<ShowVerify/>}/>
     <Route path='/showAllProjects' element={<ProjectsDisplay/>}/>
     <Route path='/showAllInvestments' element={<AllInvestments/>}/>
       <Route path='/notification' element={<Notification/>}/>

      <Route path='/login'  element={<Login />}/>
      <Route path='/confirmMail/:token'  element={<VerifyToken />}/>

      <Route path='/signup' element={<Signup />}/>       
      
      <Route path='*' element={<Navigate to='/login'/>}/>
      
     
      
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}>

    {/* Profile routes */}
         <Route path='profile' element ={<Profile/>} >

            <Route path='' element ={<ProfileDetails/>}/>
            <Route path='edit' element ={<Edit/>}/>

         </Route>

{/* Project Routes */}
         <Route path='project' element ={<Project/>}>

            <Route path='' element ={<ProjectDetails/>}/>
            <Route path='add' element ={<AddNewProject/>}/>
            <Route path='edit/:projectId' element ={<EditVerify/>}/>
            


         </Route>

         <Route path='investment' element={<Investment/>}>
      <Route path='' element={<InvestmentOpList/>}></Route>
       <Route path='view/:id' element= {<ViewInvestment/>}/>
      <Route path='createInvestmentOp' element={<Investor><CreateInvestmentOp/></Investor>}/>
      </Route>
        
      </Route>
         


     


     
    </Routes>
  </div>


)
    }
}


export default App;
