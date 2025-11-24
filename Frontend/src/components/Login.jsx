import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = ()=>{
        try {
            toast.success("login Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleRegister = ()=>{
        navigate('/register')
    }

    return (
        <div className='border border-gray-300 p-10 rounded'>

            <h1 className='mb-6'>LOGIN</h1>
            <input
                type='email'
                placeholder='Enter Your Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />

            <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />

            <button
                onClick={handleLogin}
                className='m-5 w-[60vw] lg:w-[30vw]'
            > L O G I N </button>

            <p> I don't have a Account 
                <span onClick={handleRegister} className='text-blue-500 cursor-pointer'> Register Now </span>
            </p>

        </div>
    )
}

export default Login
