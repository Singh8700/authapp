const express = require("express")

// routes create by using express.Routes()
const routes = express.Router()

// data space remove code by using body() function in ExpressValidator
const { body, validationResult } = require('express-validator')

// password create a hash by using bcrypt module
const bcrypt = require("bcrypt")

const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

routes.get("/singup",(req,res)=>{
    res.render("signup")
})

routes.post("/singup-data",
    // use custom middleware to remove extra spaces
    body("userName").trim().isLength({min:3}),
    body("fullName").trim().isLength({min:3}),
    body("contact").trim().isNumeric().isLength({min:10,max:10}),
    body("email").trim().isEmail().isLength({min:13}),
    body("password").trim().isLength({min:6}),
    
    async (req,res)=>{
    // check same error is form yes or not
    const errors = validationResult(req.body)
    if(!errors){
        res.status(400).json({
            errors,
            msg:"someting want error"
        })
    }
    
    // console.log("user files",req.body)
   
        const {userName,fullName,email,contact,password} = req.body  

        await bcrypt.genSalt(10, async (error, salt)=>{
            // console.log(salt)
            await bcrypt.hash(password,salt,async (errors,hash)=>{
                // console.log("password hash",hash)
                const createUser = await userModel.create({
                    userName,
                    fullName,
                    email,
                    contact,
                    password:hash
                })
                // after create user now we login by default (using jwt token)
                const token = await jwt.sign({
                    hash
                },process.env.JWT_SECRET)
                const tempfile = await jwt.sign({ password }, process.env.JWT_SECRET)
                    res.cookie("user", token)
                    // console.log("jwt temfile check",tempfile)
                    const realPass = await jwt.verify(tempfile,process.env.JWT_SECRET)
                    // console.log("temp file : ",realPass)
                   await res.render("index",{
                        data:createUser,realPass:realPass.password
                    })
            })
        })
    
})


module.exports = routes