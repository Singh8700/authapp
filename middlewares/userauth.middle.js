// jwt get token & vrifiy
const jwt = require("jsonwebtoken")

// router require
const express = require("express")

const router = express.Router()

const auth = async(req,res,next)=>{
    // token get
    const token = req.cookies.user
    // console.log("auth token",token)
    // check token is exite - not
    if(!token){
        return res.render("signup")
    }

    // if token 
    try{
        // jwt token decoded
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decode
        // console.log("verify",decode)
        next()
    }catch (e){
        return res.status(401).json({
            e,
            msg:"something want wrong"
        })
    }
}

module.exports = auth