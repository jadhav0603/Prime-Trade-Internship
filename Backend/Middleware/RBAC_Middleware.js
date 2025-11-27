const express = require('express')

const RBAC_Middleware = (...allowedRole)=>{
    return(req,res,next) =>{
        if(!allowedRole.includes(req.user.role)){
            return res.status(403).json({message:"Access Denied"})
        }

        next()
    }
}

module.exports = RBAC_Middleware