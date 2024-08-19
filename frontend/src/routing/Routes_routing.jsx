import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import Transection from '../pages/Transection'


const Routes_routing = ({ checkAuthStatus ,handleLogout,data, isAuthenticated}) => {
  return (
    <div>
        <Routes>
            <Route  path='/' element={<Home email={data.email} isAuthenticated={isAuthenticated}/>}/>
            <Route  path='/dashboard' element={<Dashboard/>}/>
            <Route  path='/login' element={<Login onLogin={checkAuthStatus}  />}/>
            <Route  path='/signup' element={<Signup onRegister={checkAuthStatus}/>}/>
            <Route  path='/profile' element={<Profile data={data} handleLogout={handleLogout}/>}/>
            <Route path='/transection/:id' element={<Transection/>}/>
        </Routes>
    </div>
  )
}

export default Routes_routing