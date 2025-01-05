const cookieParser = require("cookie-parser")
const express = require("express")
const path = require("path")
const db = require("./config/db.config")
const dotenv = require("dotenv")
dotenv.config()
const app = express()


app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())

db()

const indexRoutes = require("./userdetails/indexRoutes.details")
app.get("/",indexRoutes)


const singUpDetails = require("./userdetails/singup.details")
const loginDetails = require("./userdetails/login.details")
const LogoutDetails = require("./userdetails/logout.details")
app.use("/user",singUpDetails)
app.use("/user",loginDetails)
app.use("/user",LogoutDetails)

app.listen(3000,()=>{
    console.log("server ")
})