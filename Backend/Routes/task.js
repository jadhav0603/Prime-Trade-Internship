const express = require('express')
const authMiddleware = require('../Middleware/authMiddleware')
const RBAC_Middleware = require('../Middleware/RBAC_Middleware')
const taskModel = require('../Models/taskModel')
const userModel = require('../Models/userModel')
const router = express.Router()


router.post('/add-task',authMiddleware, async(req,res)=>{
    const {taskName} = req.body
    console.log(taskName)
    try{
        if(!taskName){
            return res.status(404).json({message:"task is Empty"})
        }

        const newTask = new taskModel({taskName, userId: req.user.userId})
        await newTask.save()
        return res.status(200).json({message:"Task Added Successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({addTaskError:error.message})
    }
})


router.get('/my-task', authMiddleware, async(req,res)=>{
    try {
        const myTask = await taskModel.find({userId:req.user.userId})
        
        if(!myTask){
            return res.status(404).json({message:"Task Data Not Available"})
        }

        return res.status(200).json(myTask)

    } catch (error) {
        return res.status(500).json({getTaskDataError:error.message})
    }
})


router.patch('/update-task', authMiddleware, async(req,res)=>{
    const {_id,taskName} = req.body
    try {

        let findData;

        if(req.user.role === "Admin"){
            findData = await taskModel.findOne({_id})
        }
        else{
            findData = await taskModel.findOne({_id, userId:req.user.userId})
        }


        if(!findData){
            return res.status(404).json({message:"data not found"})
        }

        await taskModel.updateOne(
            {_id},
            {$set:{taskName}}
        )

        return res.status(200).json({message:"Task Updated"})

    } catch (error) {
        return res.status(500).json({updateTaskError : error.message})
    }
})


router.delete('/delete-task/:id', authMiddleware, async(req,res)=>{
    const id = req.params.id
    try {
        await taskModel.findByIdAndDelete({_id:id})

        return res.status(200).json({message:"Task Deleted Successfully"})
        
    } catch (error) {
        return res.status(500).json({deleteTaskError:error})
    }
})


router.get('/allTask', authMiddleware, RBAC_Middleware("Admin"),  async(req,res)=>{
  
    try {
        const myTask = await taskModel.find().populate("userId", "name role")
        
        if(!myTask){
            return res.status(404).json({message:"Task Data Not Available"})
        }

        return res.status(200).json(myTask)

    } catch (error) {
        return res.status(500).json({getTaskDataError:error.message})
    }
})


module.exports = router

