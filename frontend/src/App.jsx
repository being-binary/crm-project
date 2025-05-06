import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/HomePage'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthForm from './pages/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { setupInterceptors } from './api/axiosInstace'
import EmployeeList from './pages/EmployeeList'

function App() {
  const user = useSelector((state) => state.user)
  const login = user.token ? true : false
  const dispatch = useDispatch()


  useEffect(() => {
    setupInterceptors(dispatch)
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className='w-full pt-[65px]'>
        <Routes>
          <Route path='/' element={login ? <EmployeeList /> : <Navigate to='/auth' />} />
          <Route path='/addnew' element={login ? <Home /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={!login ? <AuthForm /> : <Navigate to='/' />} />

        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
