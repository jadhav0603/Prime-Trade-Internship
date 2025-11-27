const express = require('express')
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const auth = req.headers.authorization
    try {
        if(!auth){
            return res.status(401).json({message:"Authorization header missing"})
        }

        const token = auth.split(" ")[1]

        if(!token){
            return res.status(401).json({message : "Token Missing"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
             if(err){
                    return res.status(401).json({message: "Token Expired, Login again"})
            }
            req.user = decoded
            next()
        } )
    } catch (error) {
        return res.status(500).json({Autherror : error.message })
    }
}

module.exports = authMiddleware