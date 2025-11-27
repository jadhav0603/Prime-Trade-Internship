const express = require('express')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel
