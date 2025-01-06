const express = require("express")

const routes = express.Router()

routes.get("/alertbox",(req,res)=>{
    res.send("work")
})

module.express = routes