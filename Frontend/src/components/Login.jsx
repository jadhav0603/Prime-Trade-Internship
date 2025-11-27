import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post("https://prime-trade-internship-1.onrender.com/login",{
                email, password
            })

            const token = response.data.token
            console.log("data : ", response.data.userDetails)
            toast.success(response.data.message)
            localStorage.setItem("token",token)
            
            if(response.data.userDetails.role === "Admin"){
                navigate('/adminDashboard', {state:{userDetails: response.data.userDetails}})
            }
            else{
                navigate('/userDashboard', {state:{userDetails: JSON.stringify(response.data.userDetails)}})
            }
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const handleRegister = ()=>{
        navigate('/register')
    }

    return (
        <div className='border border-gray-300 p-10 rounded'>

            <h1 className='mb-6'>LOGIN</h1>
            <form onSubmit={handleLogin}>
            <input
                type='email'
                placeholder='Enter Your Email Address'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />

            <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />

            <button
                type='submit'
                className='m-5 w-[60vw] lg:w-[30vw]'
            > L O G I N </button>
            </form>

            <p> I don't have a Account 
                <span onClick={handleRegister} className='text-blue-500 cursor-pointer'> Register Now </span>
            </p>

        </div>
    )
}

export default Login
