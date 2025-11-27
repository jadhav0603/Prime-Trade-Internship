const express = require('express')
const mongoose =  require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

const taskModel = mongoose.model("tasks", taskSchema)


module.exports = taskModel