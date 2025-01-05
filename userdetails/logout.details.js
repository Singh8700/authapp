const express = require('express')

const routes = express.Router()


routes.post("/logout",(req,res)=>{
    res.cookie("user","")
    console.log("user log out")
    res.redirect("/")
})

module.exports = routes