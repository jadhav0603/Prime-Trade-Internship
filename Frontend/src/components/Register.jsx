import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [DOB, setDOB] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passError, setPassError] = useState("")
    const [error,setError] = useState(true)


    const handleRegister = ()=>{
        console.log("done")
        toast.success("User Successfully Registered")
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

            <input
                type='name'
                placeholder='Enter Your Full Name'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />

            <input
                type='email'
                placeholder='Enter Your Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />

            <input
                type='date'
                placeholder='Enter Your Email Address'
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
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

            <input
                type="password"
                placeholder='Enter Your Password'
                value={confirmPassword}
                onChange={(e) => handlePassword(e)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />
            <br />
            <p className={`${error ? 'text-red-500' : 'text-green-500'} flex justify-left ml-5`}>{passError}</p>

            <button
                onClick={handleRegister}
                className='m-5 w-[60vw] lg:w-[30vw]'
            > R E G I S T E R </button>

            

        </div>
  )
}

export default Register
