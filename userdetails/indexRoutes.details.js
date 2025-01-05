const userModel = require("../models/user.model")
const express = require("express")
const auth = require("../middlewares/userauth.middle")
const jwt =require("jsonwebtoken")
const bcrypt = require("bcrypt")
const routes = express.Router()

routes.get("/",auth,async (req,res)=>{
    try{
        const password = req.cookies.user
    // console.log("password is :",password)
    const token = await jwt.verify(password,process.env.JWT_SECRET)
    // console.log("token is :",token.password)
    const userData = token.password
    const data = await userModel.findOne({password:userData})
    const realPass = jwt.verify(req.cookies.tempfile,process.env.JWT_SECRET).userPassword
    // console.log("password",realPass.userPassword)
   const check = await bcrypt.compare(realPass,userData,(erre,result)=>{
        // console.log(result)
        return result
    })
    if(check){
        res.status(400).json({
            msg:"some thing want wrong"
        })
    }
    res.render("index",{
        data,realPass
    })
    }catch (e){
        res.status(400).json({
            e,
            msg:"something is Wrong"
        })
    }
})

module.exports = routes