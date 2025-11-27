import React from 'react'
import {useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='w-full flex justify-end'>
      <button
                onClick={()=>navigate('/login')}
                className='m-5 bg-blue-200'
            > L O G I N </button>
      </div>
      <h1 className='mb-6'>Welcome User</h1>
      <p className='mb-6'> Thank you for chossing this platform </p>
      <p className='mb-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus nobis est saepe odio reprehenderit doloribus temporibus, iste eos porro, cum quibusdam, facilis quos architecto optio tempora sequi ex ipsum deleniti?</p>
      <h3 className='text-xl font-semibold'>Manage your tasks efficiently and stay organized, informed, and confident.</h3>
      
    </div>
  )
}

export default Home
