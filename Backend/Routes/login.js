const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../Models/userModel')

const router = express.Router()



router.post('/login', async(req,res)=>{
    const {email, password} = req.body
    try{
        const userDetails = await userModel.findOne({email})
        if(!userDetails){
            return res.status(404).json({message: "User Not Found. Please Enter Valid Details"})
        }

        const passCheck = await bcrypt.compare(password, userDetails.password)

        if(!passCheck){
            return res.status(403).json({message : "Invalid Credential"})
        }

        const token = await jwt.sign({userId:userDetails._id, email:userDetails.email , role:userDetails.role}, process.env.JWT_SECRET, {expiresIn : '1h'} )

        return res.status(200).json({message: "Login successfully", token, userDetails})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({loginError : error.message})
    }
})



router.post('/register', async(req,res)=>{
    const{name,email,DOB,password,role} = req.body
    try {
        const userExist = await userModel.findOne({email})

        if(userExist){
            return res.status(409).json({message: 'User Already Registered'})
        }

        const hashpass = await bcrypt.hash(password, 10)

        const newUser = new userModel({name,email,DOB,password:hashpass,role})
        await newUser.save()

        return res.status(200).json({message : 'User Sucessfully Registered'})

    } catch (error) {
        console.log(error)
        return res.status(500).json({registerError : error.message})
    }
})


module.exports = router

