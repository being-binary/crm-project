import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setuserlogout } from '../app/slice/UserSlice'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
  return (
    <nav className='w-full h-[65px] bg-gradient-to-r from-blue-500 via-sky-300 to-white fixed z-50'>
        <div className='w-full h-full flex flex-row justify-between items-center px-5'>
            <h1 className='text-2xl capitalize font-semibold text-white'>Empolyee Manager</h1>
            <ul className='flex flex-row gap-2'>
                    {
                       !user.token && <li className='text-lg capitalize text-sky-700 font-semibold'>login</li>
                    }
                    {
                        user.token && <li className='text-lg capitalize text-sky-700 font-semibold cursor-pointer' onClick={()=>dispatch(setuserlogout())}>logout</li>
                    }
                    {
                        user.token && <li className='text-lg capitalize text-sky-700 font-semibold cursor-pointer' ><Link to={'/addnew'}>Add new Employee</Link> </li>
                    }
                    {
                        user.token && <li className='text-lg capitalize text-sky-700 font-semibold cursor-pointer' ><Link to={'/'}>Home</Link> </li>
                    }
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
