const userModel = require("../models/user.model")

// router require
const express = require("express")

const router = express.Router()

const userCheck = async (req, res, next) => {
    //    await console.log("user name",req.body.userName)
    const user = await userModel.findOne({ userName: req.body.userName })
    // console.log(user)
    if(user){
        return res.status(400).json({
            msg:"user is already exitis please use another User Name"
        })
    }
    
    const email = await userModel.findOne({email:req.body.email})
    // console.log("user mail id",email)
    if(email){
        return res.status(400).json({
            msg:"email is already exitis please use another email"
        })
    }
    
    const contact = await userModel.findOne({contact:req.body.contact})
    if(contact){
        return res.status(400).json({
            msg:"this contact is already exitis please use another contact number"
        })
    }
    //    res.json(req.body)
    return next()
}

module.exports = userCheck