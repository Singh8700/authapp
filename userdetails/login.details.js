const express = require("express")
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const routes = express.Router()

routes.get("/login",(req,res)=>{
    res.render("login")
})

routes.post("/login-data",async (req,res,next)=>{
    try{
        // form data check
    
    const user = await userModel.findOne({userName: req.body.userName})
    if(!user){
        res.status(400).json({
            msg:"Something is wrong"
        })
        return next()
    }
    // console.log("user is exiting & user name is :", userInput)
    // res.json(userInput)
    
    // passowrd check
    const userPassword = req.body.password
    // console.log(userPassword)
    bcrypt.compare(userPassword,user.password,(error,result)=>{
        if(error){
            res.status(400).json({
                error,
                msg:"Something want wrong"
            })
           return next()
        }
    const token = jwt.sign({
        password: user.password
    },process.env.JWT_SECRET)
    const tempfile = jwt.sign({userPassword},process.env.JWT_SECRET)
    res.cookie("user",token)
    res.cookie("tempfile",tempfile)
    res.redirect("/")
    })
    }catch (e){
        res.status(400).json({
            e,
            msg:"Something is wrong"
        })
    }
})




module.exports = routes