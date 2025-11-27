import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const location = useLocation()
    let userDetails = location.state?.userDetails
    
    if (typeof userDetails === "string") {
        userDetails = JSON.parse(userDetails);
    }

    // console.log(userDetails)

    const [taskName, setTaskName] = useState("")
    const [taskData, setTaskData] = useState([])

    const [editTaskName, setEditTaskName] = useState("")
    const [editTaskId, setEditTaskId] = useState(null)

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const fetchTask = async()=>{
    try {
            const response = await axios.get('https://prime-trade-internship-1.onrender.com/task/alltask',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
        })
            
            setTaskData(response.data)
            console.log("fetch data - ",response.data)
        }
         catch (error) {
            if(error.response.status == 401){
                 toast.error(error.response.data.message)
                localStorage.removeItem("token")
                navigate('/login')
            }
            else{
                toast.error(error.response.data.message)
            }
        }
    }


    useEffect(()=>{
        const call = async()=>{
            await fetchTask()
        }
        call()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])


    const addTask = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.post('https://prime-trade-internship-1.onrender.com/task/add-task',
                {taskName},
                {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("add Task - ",response.data)
            toast.success(response.data.message)
            setTaskName("")
            // setTaskData([...taskData, response.data])
            fetchTask()
        } catch (error) {
            if(error.response.status == 401){
                 toast.error(error.response.data.message)
                localStorage.removeItem("token")
                navigate('/login')
            }
            else{
                toast.error(error.response.data.message)
            }
        }

    }


    const handleEdits = (ele)=>{
        setEditTaskId(ele._id)
        setEditTaskName(ele.taskName)
    }


    const handleUpdate = async(id,task)=>{
        try {
            const response = await axios.patch('https://prime-trade-internship-1.onrender.com/task/update-task',{
                _id:id, taskName:task
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response.data)
            setEditTaskId(null)
            fetchTask()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async(id)=>{
        try {
            const response = await axios.delete(`https://prime-trade-internship-1.onrender.com/task/delete-task/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            toast.success(response.data.message)
            fetchTask()
        } catch (error) {
            console.log("delete task error : ", error)
        }
    }


    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

 
    return (
    <div>
      <div className='w-full flex justify-end'>
      <button
                onClick={handleLogout}
                className='m-5 bg-blue-200'
            > L O G O U T </button>
      </div>
      <h1 className='uppercase'>welcome {userDetails.name} </h1>
      <h1 className='mb-6'>on {userDetails.role} Dashboard</h1>

        <h3 className='text-xl font-semibold'>Manage your tasks efficiently and stay organized, informed, and confident.</h3>
    
        <form onSubmit={addTask}>
            <input
                type='name'
                placeholder='Enter Your Task'
                value={taskName}
                required
                onChange={(e) => setTaskName(e.target.value)}
                className='w-[60vw] lg:w-[30vw] p-2 border rounded m-3'
            />

            <button
                type='submit'
                className='m-5'
            > A D D &ensp; T A S K </button>

        </form>
        <hr />

        <div>
            <h1 className='m-6'>All  User Task's</h1>

            <ol>
                {taskData.map((ele,i)=>(
                    <li key={i}>{
                        editTaskId === ele._id? (
                            <div className='border border-gray-500'>
                                <input 
                                    type='text'
                                    value={editTaskName}
                                    className='w-[20vw] border'
                                    onChange={(e)=>setEditTaskName(e.target.value)}
                                />

                                <button className='m-1' onClick={()=>{handleUpdate(ele._id,editTaskName)}}>Update</button>
                                <button className='m-1' onClick={()=>setEditTaskId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div className={`flex justify-center items-center`}>
                                <p className='px-5'>{i+1}</p>
                                <p className='w-[20vw] flex'> {ele.taskName} </p>
                                <p className='w-[10vw] flex'> {ele.userId.name}</p>
                                <p className='w-[10vw] flex'>{ele.userId.role}</p>
                                <button  onClick={()=>handleEdits(ele)}>Edit</button>
                                <button className='m-1' onClick={()=>handleDelete(ele._id)}>Delete</button>
                                
                            </div>
                        )
                    }</li>
                ))}
            </ol>
    
        </div>

    </div>
  )
}

export default AdminDashboard
