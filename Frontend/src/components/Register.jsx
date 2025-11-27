import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [DOB, setDOB] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [roleValue, setRoleValue] = useState("User")
    const [passError, setPassError] = useState("")
    const [error,setError] = useState(true)
    const [btnDisable, setBtnDisable] = useState(true)

    const navigate = useNavigate()

    useEffect(()=>{
        // if(error){
        //     setBtnDisable(true)
        // }
        // else{
        //     setBtnDisable(false)
        // }

        setBtnDisable(error)

    },[error])


    const handleRegister = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('https://prime-trade-internship-1.onrender.com/register', {
                name:userName,email,DOB,password,role:roleValue})

                console.log(response.data)
                toast.success("User Successfully Registered")
                navigate('/login')
                
            } catch (error) {
                console.log(error.response.data.message)
                toast.error(error.response.data.message)
            }
            
    }

    const handlePassword = (e)=>{
        const value = e.target.value
        setConfirmPassword(e.target.value)
        if (value != password){
            setPassError("Passwords Not Matched")
            setError(true)
        }
        else{
            setPassError("Password Matched")
            setError(false)
        }

    }

  return (
    <div className='border border-gray-300 p-10 rounded'>

            <h1 className='mb-6'>REGISTER</h1>
            <form onSubmit={handleRegister} >
            <input
                type='name'
                placeholder='Enter Your Full Name'
                value={userName}
                required
                onChange={(e) => setUserName(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />

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
                type='date'
                placeholder='Enter Your Email Address'
                value={DOB}
                required
                onChange={(e) => setDOB(e.target.value)}
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

            <input
                type="password"
                placeholder='Enter Your Password'
                value={confirmPassword}
                required
                onChange={(e) => handlePassword(e)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />
            <p className={`${error ? 'text-red-500' : 'text-green-500'} flex justify-left ml-5`}>{passError}</p>

            <div className='w-[60vw] lg:w-[30vw] mx-5 my-3 flex justify-between'>
            <p className='w-fit flex items-center '> Role : </p>
             <select
                value={roleValue}
                onChange={(e) => setRoleValue(e.target.value)}
                className='w-[52vw] lg:w-[25vw] p-2 border rounded'
            >
                <option value="User" >User</option>
                <option value="Admin" >Admin</option>
            </select>
            </div>

            <button
                type='submit'
                disabled = {btnDisable}
                className='m-5 w-[60vw] lg:w-[30vw]'
            > R E G I S T E R </button>

            </form>

        </div>
  )
}

export default Register
