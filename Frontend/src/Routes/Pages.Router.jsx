import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import UserDashboard from '../components/UserDashboard'
import AdminDashboard from '../components/AdminDashboard'

const PagesRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register />} />
      <Route path='/userDashboard' element={<UserDashboard/>} />
      <Route path='/adminDashboard' element={<AdminDashboard />} />
    </Routes>
  )
}

export default PagesRouter
